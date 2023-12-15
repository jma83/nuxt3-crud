import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type { AtLeast } from "~/shared/types/AtLeast";
import type { Uuid } from "~/shared/types/Uuid";

export interface ActionsData {
  addTodoTask(newTodoTask: TodoTaskData): void;
  editTodoTaskById(todoEditTaskData: AtLeast<TodoTaskData, "id">): void;
  deleteTodoTaskById(taskId: Uuid): void;
  setIsGridView(value: boolean): void;
  setNameSearch(value: string): void;
}
