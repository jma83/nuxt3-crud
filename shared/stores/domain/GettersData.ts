import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type StateData from "~/shared/stores/domain/StateData";

import type TodoFilterData from "~/filters/domain/TodoFilterData";

export interface GettersData {
  todoTasksByActiveFilter(state: StateData): TodoTaskData[];
  filteredTodoTasks(state: StateData): TodoTaskData[];
  currentFilter(state: StateData): TodoFilterData | undefined;
}
