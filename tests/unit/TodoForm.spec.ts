import { shallowMount } from "@vue/test-utils";
import type StateData from "~/shared/stores/domain/StateData";
import TodoForm from "~/components/TodoForm.vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import TodoTaskMother from "./tasks/TodoTaskMother";
import {
  ValidationTaskNameEmptyStrategy,
  ValidationTaskNameMinStrategy,
} from "~/tasks/application/ValidateTaskNameFormat";
import StoreStateMother from "./store/state/StoreStateMother";
import type { StoreActions, StoreGetters } from "pinia";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { describe, test, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("TodoForm.vue", () => {
  let actions: StoreActions<StateData>;
  let state: StateData;
  let storeConfig: TestingPinia;

  beforeEach(() => {
    actions = {
      addTodoTask: vi.fn(),
    };
    state = StoreStateMother.createDefault();
    storeConfig = createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
    });
  });
  it("should fill the form and submit the task to the store", async () => {
    const newTask: TodoTaskData = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
    });
    const spyGetTaskId = vi.spyOn(wrapper.vm.createNewTask, "getTaskId");
    spyGetTaskId.mockReturnValue(newTask.id);

    const input = wrapper.find("input");
    const inputElement: HTMLInputElement = input.element as HTMLInputElement;
    inputElement.value = newTask.name;
    await input.trigger("input");
    const form = wrapper.find("form");
    await form.trigger("submit");
    const store = useTaskStore();
    expect(store.addTodoTask).toHaveBeenCalledTimes(1);
  });

  it("should fill the form and submit with an empty validation error", async () => {
    const wrapper = shallowMount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
      data() {
        return {
          inputValue: "",
        };
      },
    });
    const spyIsInputValid = vi.spyOn(wrapper.vm, "isInputValid");
    const form = wrapper.find("form");
    await form.trigger("submit");
    expect(wrapper.vm.errorMessage).toContain(new ValidationTaskNameEmptyStrategy().getError());
    expect(spyIsInputValid).toHaveReturnedWith(false);
    const store = useTaskStore();
    expect(store.addTodoTask).not.toHaveBeenCalled();
  });

  it("should fill the form and submit with a minimum size validation error", async () => {
    const wrapper = shallowMount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
      data() {
        return {
          inputValue: "T",
        };
      },
    });
    const spyIsInputValid = vi.spyOn(wrapper.vm, "isInputValid");
    const form = wrapper.find("form");
    await form.trigger("submit");

    expect(wrapper.vm.errorMessage).toContain(new ValidationTaskNameMinStrategy().getError());
    expect(spyIsInputValid).toHaveReturnedWith(false);
    const store = useTaskStore();
    expect(store.addTodoTask).not.toHaveBeenCalled();
  });
});
