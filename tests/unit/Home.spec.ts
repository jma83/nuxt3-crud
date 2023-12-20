import { shallowMount, VueWrapper } from "@vue/test-utils";
import type { StoreActions, StoreGetters } from "pinia";
import { createTestingPinia, type TestingPinia } from "@pinia/testing";
import type StateData from "../../shared/stores/domain/StateData";
import Home from "../../components/Home.vue";
import TodoTaskMother from "./tasks/TodoTaskMother";
import { TodoFilterId } from "../../filters/domain/TodoFilterId";
import { type RouteLocationNormalized as Route } from "vue-router";
import TodoFilterMother from "./filters/TodoFilterMother";
import RouteMother from "./routes/RouteMother";
import StoreStateMother from "./store/state/StoreStateMother";
import type { StoreData } from "../../shared/stores/domain/StoreData";
import { describe, test, it, expect, beforeEach, afterEach, vi } from "vitest";

const MOCKED_ROUTE: Route = RouteMother.createDefaultRoute();

describe("Home.vue", () => {
  let getters: StoreGetters<StateData>;
  let state: StateData;
  let storeConfig: TestingPinia;
  let storeTasks: StoreData;
  let actions: StoreActions<StateData>;
  let wrapper: VueWrapper<typeof Home>;

  beforeEach(() => {
    actions = {
      setFilters: vi.fn(),
      setIsGridView: vi.fn(),
      setNameSearch: vi.fn(),
    };
    state = StoreStateMother.createDefault();
    getters = {
      currentFilter: () => state.filters.find((filter) => filter.active),
    };

    storeConfig = createTestingPinia({
      initialState: { tasks: state },
      stubActions: false,
      stubPatch: false,
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

  test("should check computed property isEmptyTasks is false when is filled", () => {
    const task = TodoTaskMother.createActiveTask();
    storeTasks.todoTasks = [task];

    expect(wrapper.vm.isEmptyTasks).not.toBeTruthy();
  });

  it("should call setFilters action when route param changes", () => {
    const { id } = TodoFilterMother.createFilter(TodoFilterId.Done);
    const spyUpdateFilters = vi.spyOn(wrapper.vm.updateActiveFilterById, "execute");
    wrapper.vm.handleChangeFilter({
      ...MOCKED_ROUTE,
      query: { filter: id as string },
    });

    expect(spyUpdateFilters).toHaveBeenCalledWith(id);
    const store = useTaskStore();
    expect(store.setFilters).toHaveBeenCalledTimes(1);
  });

  it("should not call setFilters action when filter is the same for current param", () => {
    const { id } = TodoFilterMother.createFilter(TodoFilterId.All);
    const spyUpdateFilters = vi.spyOn(wrapper.vm.updateActiveFilterById, "execute");
    wrapper.vm.handleChangeFilter({
      ...MOCKED_ROUTE,
      query: { filter: "not-valid-filter" },
    });

    expect(spyUpdateFilters).toHaveBeenCalledWith(id);
    const store = useTaskStore();
    expect(store.setFilters).not.toHaveBeenCalled();
  });

  it("should call setIsGridView action when change is notified", () => {
    const spyUpdateGridView = vi.spyOn(wrapper.vm.updateGridView, "execute");
    wrapper.vm.handleChangeViewFilter(!state.isGridView);

    expect(spyUpdateGridView).toHaveBeenCalledWith(!state.isGridView);
    const store = useTaskStore();
    expect(store.setIsGridView).toHaveBeenCalled();
  });

  it("should call setIsGridView action when change is notified", () => {
    const inputSearch: string = "New search";
    const spyUpdateGridView = vi.spyOn(wrapper.vm.updateNameSearch, "execute");
    wrapper.vm.handleInputSearch(inputSearch);

    expect(spyUpdateGridView).toHaveBeenCalledWith(inputSearch);
    const store = useTaskStore();
    expect(store.setNameSearch).toHaveBeenCalled();
  });
});
