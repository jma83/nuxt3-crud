import type { StateData } from "~/shared/stores/domain/StateData";
import { todoFilterItems } from "~/filters/domain/todoFilterItems";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type TodoFilterData from "~/filters/domain/TodoFilterData";
import { TodoFilterId } from "~/filters/domain/TodoFilterId";
import type { AtLeast } from "~/shared/types/AtLeast";
import type { Uuid } from "~/shared/types/Uuid";
import type { StoreDefinitionData } from "~/shared/stores/domain/StoreData";

export const storeName = "tasks";

export const useTaskStore: StoreDefinitionData = defineStore(storeName, {
  state: (): StateData => ({
    todoTasks: [],
    filters: [...todoFilterItems],
    nameSearch: "",
    isGridView: true,
  }),
  getters: {
    todoTasksByActiveFilter(state: StateData): TodoTaskData[] {
      if (!this.currentFilter) {
        return [];
      }
      if (this.currentFilter.id === TodoFilterId.All) {
        return state.todoTasks;
      }
      const isDoneFilter = this.currentFilter.id === TodoFilterId.Done;
      return state.todoTasks.filter((task: TodoTaskData) => task.isDone === isDoneFilter);
    },
    filteredTodoTasks(state: StateData): TodoTaskData[] {
      const tasks: TodoTaskData[] = this.todoTasksByActiveFilter;
      return tasks.filter((task: TodoTaskData) => task.name.toLowerCase().includes(state.nameSearch.toLowerCase()));
    },
    currentFilter(state: StateData): TodoFilterData | undefined {
      return state.filters.find((filter) => filter.active);
    },
  },
  actions: {
    addTodoTask(newTodoTask: TodoTaskData): void {
      this.todoTasks = [...this.todoTasks, newTodoTask];
    },
    editTodoTaskById(todoEditTaskData: AtLeast<TodoTaskData, "id">): void {
      this.todoTasks = this.todoTasks.map((task) =>
        task.id === todoEditTaskData.id ? { ...task, ...todoEditTaskData } : task,
      );
    },
    deleteTodoTaskById(taskId: Uuid) {
      this.todoTasks = this.todoTasks.filter((t) => t.id !== taskId);
    },
    setFilters(filters: TodoFilterData[]) {
      this.filters = [...filters];
    },
    setIsGridView(value: boolean) {
      this.isGridView = value;
    },
    setNameSearch(value: string) {
      this.nameSearch = value;
    },
  },
});
