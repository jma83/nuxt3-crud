import { shallowMount, VueWrapper } from "@vue/test-utils";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import type StateData from "~/shared/stores/domain/StateData";
import Home from "~/components/Home.vue";
import TodoTaskMother from "./tasks/TodoTaskMother";
import StoreStateMother from "./store/state/StoreStateMother";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useTaskStore } from "~/stores/TaskStore";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";

describe("Home.vue", () => {
  let state: StateData;
  let storeConfig: TestingPinia;
  let storeTasks: StoreData;
  let wrapper: VueWrapper<typeof Home>;

  beforeEach(() => {
    state = StoreStateMother.createDefault();

    storeConfig = createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
      createSpy: vi.fn,
    });

    // @ts-ignore
    wrapper = shallowMount(Home, {
      global: {
        plugins: [storeConfig],
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
