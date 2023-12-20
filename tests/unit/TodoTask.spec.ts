import { mount } from "@vue/test-utils";
import TodoTask from "@/components/tasks/TodoTask.vue";
import TodoTaskMother from "./tasks/TodoTaskMother";
import { describe, test, it, expect, beforeEach, afterEach, vi } from "vitest";

const checkEmitters = (emittedEvent: any[], value: any) => {
  expect(emittedEvent).toBeTruthy();
  expect(emittedEvent.length).toBe(1);
  expect(emittedEvent[0][0]).toStrictEqual(value);
};

describe("TodoTask.vue", () => {
  it("should render not editable task with expected info", () => {
    const isEdit = false;
    const task = TodoTaskMother.createActiveTask();
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const label = wrapper.find("label");
    const checkbox = wrapper.find("input[type=checkbox]");
    const checkboxElement = checkbox.element as HTMLInputElement;
    expect(label.text()).toBe(task.name);
    expect(checkboxElement.checked).toBe(false);
  });

  it("should render editable task with expected info", async () => {
    const isEdit = true;
    const task = TodoTaskMother.createActiveTask();
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const label = wrapper.find("label");
    const checkbox = wrapper.find("input[type=checkbox]");
    const textbox = wrapper.find("input[type=text]");
    const checkboxElement = checkbox.element as HTMLInputElement;
    const textboxElement = textbox.element as HTMLInputElement;
    await wrapper.vm.$nextTick();
    expect(label.element).not.toBeDefined();
    expect(textboxElement.value).toBe(task.name);
    expect(checkboxElement.checked).toBe(false);
  });

  it("should emit event on click edit button", async () => {
    const eventClickEmitter: string = "on-click-edit";
    const isEdit = false;
    const task = TodoTaskMother.createActiveTask();
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });

    const btn = wrapper.find("button.todoTaskButtons-button-edit");
    await btn.trigger("click");
    expect(wrapper.emitted(eventClickEmitter)).toBeDefined();
    checkEmitters(wrapper.emitted(eventClickEmitter)!, task.id);
  });

  it("should emit event on input inside edit textbox", async () => {
    const eventClickEmitter: string = "on-input-edit";
    const task = TodoTaskMother.createActiveTask();
    const taskNameModified = `${task.name}1`;
    const isEdit = true;
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const inputTask = wrapper.find("input[type=text]");
    const inputElement: HTMLInputElement = inputTask.element as HTMLInputElement;
    inputElement.value = taskNameModified;
    await inputTask.trigger("input");
    expect(wrapper.emitted(eventClickEmitter)).toBeDefined();
    checkEmitters(wrapper.emitted(eventClickEmitter)!, taskNameModified);
  });

  it("should emit event on click delete button", async () => {
    const eventClickEmitter: string = "on-click-delete";
    const isEdit = false;
    const task = TodoTaskMother.createActiveTask();
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const btn = wrapper.find("button.todoTaskButtons-button-delete");
    await btn.trigger("click");
    expect(wrapper.emitted(eventClickEmitter)).toBeDefined();
    checkEmitters(wrapper.emitted(eventClickEmitter)!, task.id);
  });

  it("should emit event on mark as done task", async () => {
    const eventClickEmitter: string = "on-check";
    const isEdit = false;
    const task = TodoTaskMother.createActiveTask();
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const checkbox = wrapper.find("input[type=checkbox]");
    const checkboxElement: HTMLInputElement = checkbox.element as HTMLInputElement;
    checkboxElement.checked = !task.isDone;
    await checkbox.trigger("change");
    expect(wrapper.emitted(eventClickEmitter)).toBeDefined();
    checkEmitters(wrapper.emitted(eventClickEmitter)!, {
      ...task,
      isDone: !task.isDone,
    });
  });

  it("should fill edit form and emit event on submit", async () => {
    const eventClickEmitter: string = "on-submit-edit";
    const isEdit = true;
    const task = TodoTaskMother.createActiveTask();
    const taskNameModified = `${task.name}1`;
    const wrapper = mount(TodoTask, {
      propsData: { task, isEdit },
    });
    const inputTask = wrapper.find("input[type=text]");
    const inputElement: HTMLInputElement = inputTask.element as HTMLInputElement;
    inputElement.value = taskNameModified;
    const btn = wrapper.find("form");
    await btn.trigger("submit");
    expect(wrapper.emitted(eventClickEmitter)).toBeDefined();
    checkEmitters(wrapper.emitted(eventClickEmitter)!, {
      ...task,
      name: taskNameModified,
    });
  });
});
