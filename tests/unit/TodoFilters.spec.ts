import { mount, shallowMount, VueWrapper } from "@vue/test-utils";
import TodoFilters from "~/components/TodoFilters.vue";
import type TodoFilterData from "~/filters/domain/TodoFilterData";
import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import TodoFilterMother from "./filters/TodoFilterMother";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RouteMother from "~/tests/unit/routes/RouteMother";
import { createMemoryHistory, createRouter, useRouter } from "vue-router";
import useCurrentFilters from "~/filters/application/useCurrentFilters";
import Home from "~/components/Home.vue";
import type StateData from "~/shared/stores/domain/StateData";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import StoreStateMother from "~/tests/unit/store/state/StoreStateMother";
import GridViewFilter from "~/components/filters/GridViewFilter.vue";

const TODO_FILTERS: TodoFilterData[] = [
  TodoFilterMother.createFilter(TodoFilterId.All),
  TodoFilterMother.createFilter(TodoFilterId.Done, false),
];

vi.mock("vue-router", () => ({
  useRouter: vi.fn(() => ({ currentRoute: { value: RouteMother.createDefaultRoute() } })),
}));

const getStoreConfig = (state: StateData = StoreStateMother.createDefault()): TestingPinia => {
  return createTestingPinia({
    initialState: { tasks: state },
    stubActions: false,
    stubPatch: false,
    createSpy: vi.fn,
  });
};

describe("TodoFilters.vue", () => {
  it("should render given filters", () => {
    const wrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [getStoreConfig(StoreStateMother.createDefault())],
      },
    });
    const store = useTaskStore();
    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.children.length).toBe(store.filters.length);
    expect(ul.text()).toContain(store.filters[0].id);
  });

  it("should render empty filters", () => {
    const wrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [getStoreConfig(StoreStateMother.createDefault([], []))],
      },
    });
    const store = useTaskStore();
    const filters = store.filters;
    const ul = wrapper.find("ul");
    expect(ul.element).toBeDefined();
    expect(ul.element.children.length).toBe(filters.length);
  });

  it("should render active filter item with active class", () => {
    const filters: TodoFilterData[] = TODO_FILTERS;
    const wrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [getStoreConfig()],
      },
    });
    const activeFilter = filters.find((filter: TodoFilterData) => filter.active);
    const ul = wrapper.find("ul");
    const activeFilterLink = wrapper.find(".todoFilters-link-active");
    expect(ul.element).toBeDefined();
    expect(activeFilter).toBeDefined();
    expect(activeFilterLink.text()).toContain(activeFilter!.id);
  });

  it("should emit view change event on change checkbox", async () => {
    const wrapper = mount(TodoFilters, {
      global: {
        plugins: [getStoreConfig()],
      },
    });
    const store = useTaskStore();
    const expectedGridView: boolean = !store.isGridView;

    const checkbox = wrapper.find("input[type=checkbox]");
    expect(checkbox.element).toBeDefined();
    await checkbox.setValue({ checked: store.isGridView });
    await checkbox.trigger("change");
    expect(store.setIsGridView).toHaveBeenCalledWith(expectedGridView);
  });

  it("should emit search event on input inside textbox", async () => {
    const nameSearch: string = "New search";
    const wrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [getStoreConfig()],
      },
    });
    const store = useTaskStore();
    const inputSearch = wrapper.find("input[type=text]");
    expect(inputSearch.element).toBeDefined();
    inputSearch.setValue(nameSearch);
    await inputSearch.trigger("input");
    expect(store.setNameSearch).toHaveBeenCalledWith(nameSearch);
  });
});
