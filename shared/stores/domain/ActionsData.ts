import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type { AtLeast } from "~/shared/types/AtLeast";
import type { Uuid } from "~/shared/types/Uuid";
import type TodoFilterData from "~/filters/domain/TodoFilterData";

export interface ActionsData {
  addTodoTask(newTodoTask: TodoTaskData): void;
  editTodoTaskById(todoEditTaskData: AtLeast<TodoTaskData, "id">): void;
  deleteTodoTaskById(taskId: Uuid): void;
  setFilters(filters: TodoFilterData[]): void;
  setIsGridView(value: boolean): void;
  setNameSearch(value: string): void;
}
