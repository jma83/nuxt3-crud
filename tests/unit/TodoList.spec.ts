import { shallowMount } from "@vue/test-utils";
import TodoList from "~/components/TodoList.vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import TodoTaskMother from "./tasks/TodoTaskMother";
import type StateData from "~/shared/stores/domain/StateData";
import { ValidationTaskNameEmptyStrategy } from "~/tasks/application/ValidateTaskNameFormat";
import StoreStateMother from "./store/state/StoreStateMother";
import { describe, test, it, expect, beforeEach, afterEach, vi } from "vitest";
import type { StoreActions, StoreGetters } from "pinia";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { useTaskStore } from "~/stores/TaskStore";

const TODO_TASKS: TodoTaskData[] = [TodoTaskMother.createActiveTask(), TodoTaskMother.createActiveTask()];

describe("TodoList.vue", () => {
  let actions: StoreActions<StateData>;
  let state: StateData;
  let storeConfig: TestingPinia;

  const getStoreMocks = () => {
    actions = {
      deleteTodoTaskById: vi.fn(),
      editTodoTaskById: vi.fn(),
    };
    state = StoreStateMother.createDefault();
    storeConfig = createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
    });
  };

  it("should list the given todo tasks", () => {
    const todoTasks: TodoTaskData[] = TODO_TASKS;
    const isEmptyTasks: boolean = false;
    const wrapper = shallowMount(TodoList, {
      propsData: { todoTasks, isEmptyTasks },
    });

    const paragraph = wrapper.find("p");
    const ul = wrapper.find("ul");
    expect(paragraph.element).not.toBeDefined();
    expect(ul.element).toBeDefined();
    expect(ul.element.childNodes.length).toBe(todoTasks.length);
  });

  it("should list empty todo tasks", () => {
    const todoTasks: TodoTaskData[] = [];
    const isEmptyTasks: boolean = true;
    const wrapper = shallowMount(TodoList, {
      propsData: { todoTasks, isEmptyTasks },
    });

    const paragraph = wrapper.find("p");
    const ul = wrapper.find("ul");
    expect(paragraph.element).not.toBeDefined();
    expect(ul.element).toBeDefined();
    expect(ul.element.childNodes.length).toBe(todoTasks.length);
  });

  it("should not list not empty but filtered todo tasks", () => {
    const todoTasks: TodoTaskData[] = [];
    const isEmptyTasks: boolean = false;
    const wrapper = shallowMount(TodoList, {
      propsData: { todoTasks, isEmptyTasks },
    });

    const paragraph = wrapper.find("p");
    const ul = wrapper.find("ul");
    expect(paragraph.text()).toBe("No results for current filters");
    expect(ul.element).not.toBeDefined();
  });

  it("should call delete confirmation action in store", () => {
    getStoreMocks();
    const task = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [storeConfig],
      },
      data() {
        return {
          deleteTaskId: task.id,
        };
      },
    });
    const spyCloseModal = vi.spyOn(wrapper.vm.modalConfirmationService, "close");
    spyCloseModal.mockImplementation(() => {
      return true;
    });
    wrapper.vm.handleConfirmDeleteTask();

    expect(wrapper.vm.errorMessage).toBe("");
    const store = useTaskStore();
    expect(store.deleteTodoTaskById).toHaveBeenCalledTimes(1);
  });

  it("should call open confirmation modal with errors", () => {
    const wrapper = shallowMount(TodoList, {});
    wrapper.vm.handleDeleteTask(TodoTaskMother.createActiveTask().id);

    expect(wrapper.vm.errorMessage).not.toBe("");
  });

  it("should call edit action in store successfully", () => {
    getStoreMocks();
    const task = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [storeConfig],
      },
      data() {
        return {
          editTaskId: task.id,
        };
      },
    });
    wrapper.vm.handleSubmitEdit(task);
    const store = useTaskStore();
    expect(store.editTodoTaskById).toHaveBeenCalledTimes(1);
  });

  it("should not call edit action in store with validation error", () => {
    getStoreMocks();
    const task = TodoTaskMother.createActiveTask("");
    const wrapper = shallowMount(TodoList, {
      global: {
        plugins: [storeConfig],
      },
      data() {
        return {
          editTaskId: task.id,
        };
      },
    });
    wrapper.vm.handleSubmitEdit(task);
    expect(wrapper.vm.errorMessage).toBe(new ValidationTaskNameEmptyStrategy().getError());
    const store = useTaskStore();
    expect(store.editTodoTaskById).not.toHaveBeenCalled();
  });
});
