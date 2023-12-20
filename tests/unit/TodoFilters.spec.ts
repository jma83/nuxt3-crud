import { mount, shallowMount } from "@vue/test-utils";
import TodoFilters from "~/components/TodoFilters.vue";
import type TodoFilterData from "~/filters/domain/TodoFilterData";
import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import TodoFilterMother from "./filters/TodoFilterMother";
import { describe, it, expect } from "vitest";

const TODO_FILTERS: TodoFilterData[] = [
  TodoFilterMother.createFilter(TodoFilterId.All),
  TodoFilterMother.createFilter(TodoFilterId.Done, false),
];

const checkEmitters = (emittedEvent: any[], value: any) => {
  expect(emittedEvent).toBeTruthy();
  expect(emittedEvent.length).toBe(1);
  expect(emittedEvent[0][0]).toStrictEqual(value);
};

describe("TodoFilters.vue", () => {
  it("should render given filters", () => {
    const filters: TodoFilterData[] = TODO_FILTERS;
    const wrapper = shallowMount(TodoFilters, {
      propsData: { filters },
      stubs: ["router-link"],
    });

    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.childNodes.length).toBe(filters.length);
    expect(ul.element.childNodes[0].textContent).toContain(filters[0].id);
  });

  it("should render empty filters", () => {
    const filters: TodoFilterData[] = [];
    const wrapper = shallowMount(TodoFilters, {
      propsData: { filters },
    });

    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.childNodes.length).toBe(filters.length);
  });

  it("should render active filter item with active class", () => {
    const filters: TodoFilterData[] = TODO_FILTERS;
    const wrapper = shallowMount(TodoFilters, {
      propsData: { filters },
      stubs: ["router-link"],
    });
    const activeFilter = filters.find((filter: TodoFilterData) => filter.active);
    const ul = wrapper.find("ul");
    const activeFilterLink = wrapper.find(".todoFilters-link-active");
    expect(ul.element).toBeDefined();
    expect(activeFilter).toBeDefined();
    expect(activeFilterLink.text()).toContain(activeFilter!.id);
  });

  it("should emit view change event on change checkbox", async () => {
    const isGridView: boolean = true;
    const eventName: string = "on-change-view-filter";
    const wrapper = mount(TodoFilters, {
      propsData: { isGridView },
    });

    const checkbox = wrapper.find("input[type=checkbox]");
    await checkbox.trigger("change");
    expect(wrapper.emitted(eventName)).toBeDefined();
    checkEmitters(wrapper.emitted(eventName)!, !isGridView);
  });

  it("should emit search event on input inside textbox", async () => {
    const nameSearch: string = "New search";
    const eventName: string = "on-input-search";
    const wrapper = shallowMount(TodoFilters, {
      propsData: { nameSearch },
    });
    await wrapper.vm.$nextTick();
    const inputSearch = wrapper.find("input[type=text]");
    await inputSearch.trigger("input");
    expect(wrapper.emitted(eventName)).toBeDefined();
    checkEmitters(wrapper.emitted(eventName)!, nameSearch);
  });
});
