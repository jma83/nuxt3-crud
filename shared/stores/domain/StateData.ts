import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type TodoFilterData from "~/filters/domain/TodoFilterData";

export default interface StateData {
  todoTasks: TodoTaskData[];
  filters: TodoFilterData[];
  isGridView: boolean;
  nameSearch: string;
}
