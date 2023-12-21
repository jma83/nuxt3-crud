import { shallowMount, VueWrapper } from "@vue/test-utils";
import Home from "~/components/Home.vue";
import TodoTaskMother from "./tasks/TodoTaskMother";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { useTaskStore } from "~/stores/TaskStore";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import StoreConfigMother from "~/tests/unit/store/StoreConfigMother";

describe("Home.vue", () => {
  let storeTasks: StoreData;
  let wrapper: VueWrapper<typeof Home>;

  beforeEach(() => {
    // @ts-ignore
    wrapper = shallowMount(Home, {
      global: {
        plugins: [StoreConfigMother.createDefault()],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should check computed property isEmptyTasks is false when is filled", () => {
    const task: TodoTaskData = TodoTaskMother.createActiveTask();
    storeTasks = useTaskStore();
    storeTasks.todoTasks = [task];

    expect(wrapper.vm.isEmptyTasks).not.toBeTruthy();
  });

  it("should check computed property isEmptyTasks is true when is not filled", () => {
    storeTasks = useTaskStore();
    storeTasks.todoTasks = [];

    expect(wrapper.vm.isEmptyTasks).toBeTruthy();
  });
});
