import { mount, RouterLinkStub, shallowMount, type VueWrapper } from "@vue/test-utils";
import TodoFilters from "~/components/TodoFilters.vue";
import type TodoFilterData from "~/filters/domain/TodoFilterData";
import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import TodoFilterMother from "./filters/TodoFilterMother";
import { describe, it, expect } from "vitest";
import StoreStateMother from "~/tests/unit/store/StoreStateMother";
import StoreConfigMother from "~/tests/unit/store/StoreConfigMother";
import { createRouter, createWebHistory } from "vue-router";
import Home from "~/components/Home.vue";

const TODO_FILTERS: TodoFilterData[] = [
  TodoFilterMother.createFilter(TodoFilterId.All),
  TodoFilterMother.createFilter(TodoFilterId.Done, false),
];

const mockedRouter = createRouter({
  history: createWebHistory(),
  routes: [{ component: Home, path: "/", name: "home" }],
});

describe("TodoFilters.vue", () => {
  it("should render given filters", () => {
    const wrapper: VueWrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [StoreConfigMother.createDefault(), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
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
        plugins: [StoreConfigMother.createDefault(StoreStateMother.createDefault([], [])), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
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
        plugins: [StoreConfigMother.createDefault(), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
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
        plugins: [StoreConfigMother.createDefault(), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
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
        plugins: [StoreConfigMother.createDefault(), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
    const store = useTaskStore();
    const inputSearch = wrapper.find("input[type=text]");
    expect(inputSearch.element).toBeDefined();
    inputSearch.setValue(nameSearch);
    await inputSearch.trigger("input");
    expect(store.setNameSearch).toHaveBeenCalledWith(nameSearch);
  });

  it("should emit setFilters action on change route event", async () => {
    const wrapper = shallowMount(TodoFilters, {
      global: {
        plugins: [StoreConfigMother.createDefault(), mockedRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
        mocks: {
          $route: mockedRouter.currentRoute,
          $router: mockedRouter,
        },
      },
    });
    const link = wrapper.find(".todoFilters-link:not(.todoFilters-link-active)");
    expect(link.exists()).toBeTruthy();
    link.trigger("click");
    await wrapper.vm.$router.replace({ path: "/", query: { filter: TodoFilterId.Done } });
    const store = useTaskStore();
    wrapper.vm.handleChangeRoute(wrapper.vm.$route);
    await wrapper.vm.$nextTick();

    expect(store.setFilters).toHaveBeenCalled();
  });
});
