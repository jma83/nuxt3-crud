import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import { type Ref, watch } from "vue";
import { useTaskStore } from "~/stores/TaskStore";
import type TodoFilterData from "~/filters/domain/TodoFilterData";
import { useRouter } from "vue-router";

export default function useCurrentFilters() {
  const { currentRoute } = useRouter();
  const store = useTaskStore();
  const searchInput: Ref<string> = ref("");

  const handleInputSearch = () => {
    store.setNameSearch(searchInput.value);
  };

  const handleChangeViewFilter = (isGridView: boolean) => {
    store.setIsGridView(isGridView);
  };

  const isGridView = computed(() => {
    return store.isGridView;
  });

  const filters = computed(() => {
    return store.filters;
  });

  const checkActiveFilterByRoute = (route = currentRoute.value): TodoFilterId => {
    if (route.path === "/" && Object.values(TodoFilterId).includes(route.query.filter as TodoFilterId)) {
      return route.query.filter as TodoFilterId;
    }
    return TodoFilterId.All;
  };

  const updateActiveFilterById = (filterId: TodoFilterId) => {
    if (store.currentFilter !== undefined && store.currentFilter.id === filterId) {
      return;
    }
    const updatedFilters: TodoFilterData[] = store.filters.map((filter: TodoFilterData) => ({
      ...filter,
      active: filter.id === filterId,
    }));
    store.setFilters(updatedFilters);
  };

  watch(currentRoute, () => {
    const filterId: TodoFilterId = checkActiveFilterByRoute();
    updateActiveFilterById(filterId);
  });

  return { handleInputSearch, handleChangeViewFilter, isGridView, filters, searchInput };
}
