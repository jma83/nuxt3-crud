import { mount, shallowMount } from "@vue/test-utils";
import type StateData from "~/shared/stores/domain/StateData";
import TodoForm from "~/components/TodoForm.vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import TodoTaskMother from "./tasks/TodoTaskMother";
import {
  ValidationTaskNameEmptyStrategy,
  ValidationTaskNameMinStrategy,
} from "~/tasks/application/ValidateTaskNameFormat";
import StoreStateMother from "./store/state/StoreStateMother";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("TodoForm.vue", () => {
  let state: StateData;
  let storeConfig: TestingPinia;

  beforeEach(() => {
    state = StoreStateMother.createDefault();
    storeConfig = createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
      createSpy: vi.fn,
    });
  });
  it("should fill the form and submit the task to the store", async () => {
    const newTask: TodoTaskData = TodoTaskMother.createActiveTask();
    const wrapper = shallowMount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
    });
    const spyGetTaskId = vi.spyOn(window.crypto, "randomUUID");
    spyGetTaskId.mockReturnValue(newTask.id);

    const input = wrapper.find("input");
    await input.setValue(newTask.name);
    await input.trigger("input");
    const form = wrapper.find("form");
    await form.trigger("submit");
    const store = useTaskStore();
    expect(store.addTodoTask).toHaveBeenCalledTimes(1);
  });

  it("should fill the form and submit with an empty validation error", async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
      props: {
        initInputText: "",
      },
    });
    const spyIsInputValid = vi.spyOn(wrapper.vm, "handleSubmit");
    const form = wrapper.find("form");
    await form.trigger("submit");
    expect(wrapper.text()).toContain(new ValidationTaskNameEmptyStrategy().getError());
    expect(spyIsInputValid).toHaveBeenCalled();
    const store = useTaskStore();
    expect(store.addTodoTask).not.toHaveBeenCalled();
  });

  it("should fill the form and submit with a minimum size validation error", async () => {
    const wrapper = mount(TodoForm, {
      global: {
        plugins: [storeConfig],
      },
      props: {
        initInputText: "T",
      },
    });
    const spyIsInputValid = vi.spyOn(wrapper.vm, "handleSubmit");
    const form = wrapper.find("form");
    await form.trigger("submit");

    expect(wrapper.text()).toContain(new ValidationTaskNameMinStrategy().getError());
    expect(spyIsInputValid).toHaveBeenCalled();
    const store = useTaskStore();
    expect(store.addTodoTask).not.toHaveBeenCalled();
  });
});
