import { shallowMount } from "@vue/test-utils";
import TodoList from "~/components/TodoList.vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import TodoTaskMother from "./tasks/TodoTaskMother";
import { ValidationTaskNameEmptyStrategy } from "~/tasks/application/ValidateTaskNameFormat";
import StoreStateMother from "./store/StoreStateMother";
import { describe, expect, it } from "vitest";
import { useTaskStore } from "~/stores/TaskStore";
import { todoFilterItems } from "~/filters/domain/todoFilterItems";
import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import TodoFilterMother from "~/tests/unit/filters/TodoFilterMother";
import type { Uuid } from "~/shared/types/Uuid";
import StoreConfigMother from "~/tests/unit/store/StoreConfigMother";

const TODO_TASKS: TodoTaskData[] = [TodoTaskMother.createActiveTask(), TodoTaskMother.createActiveTask()];

describe("TodoList.vue", () => {
  it("should list the given todo tasks", () => {
    const todoTasks: TodoTaskData[] = TODO_TASKS;
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [StoreConfigMother.createDefault(StoreStateMother.createDefault(todoTasks, todoFilterItems))],
      },
    });

    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.children.length).toBe(todoTasks.length);
  });

  it("should list empty todo tasks", () => {
    const todoTasks: TodoTaskData[] = [];
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [StoreConfigMother.createDefault(StoreStateMother.createDefault(todoTasks, todoFilterItems))],
      },
    });

    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.children.length).toBe(todoTasks.length);
  });

  it("should not list not empty but filtered todo tasks", () => {
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [
          StoreConfigMother.createDefault(
            StoreStateMother.createDefault(TODO_TASKS, [
              TodoFilterMother.createFilter(TodoFilterId.All, false),
              TodoFilterMother.createFilter(TodoFilterId.Done, true),
            ]),
          ),
        ],
      },
    });

    const paragraph = wrapper.find("p");
    expect(paragraph.text()).toBe("No results for current filters");
  });

  it("should call delete confirmation action in store", () => {
    const task = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [StoreConfigMother.createDefault()],
      },
      props: {
        initialDeleteId: task.id,
      },
    });
    wrapper.vm.handleConfirmDeleteTask();

    expect(wrapper.vm.errorMessage).toBe("");
    const store = useTaskStore();
    expect(store.deleteTodoTaskById).toHaveBeenCalledTimes(1);
    expect(store.deleteTodoTaskById).toHaveBeenCalledWith(task.id);
  });

  it("should call edit action in store successfully", () => {
    const task = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [StoreConfigMother.createDefault()],
      },
      props: {
        initialEditId: task.id as Uuid,
      },
    });
    wrapper.vm.editCurrentTask(task);
    const store = useTaskStore();
    expect(store.editTodoTaskById).toHaveBeenCalledTimes(1);
  });

  it("should not call edit action in store with validation error", () => {
    const task = TodoTaskMother.createActiveTask("");
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [StoreConfigMother.createDefault()],
      },
      props: {
        initialEditId: task.id as Uuid,
      },
    });
    wrapper.vm.editCurrentTask(task);
    expect(wrapper.vm.errorMessage).toBe(new ValidationTaskNameEmptyStrategy().getError());
    const store = useTaskStore();
    expect(store.editTodoTaskById).not.toHaveBeenCalled();
  });
});
