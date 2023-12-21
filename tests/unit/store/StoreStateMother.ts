import type StateData from "~/shared/stores/domain/StateData";
import { todoFilterItems } from "~/filters/domain/todoFilterItems";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type TodoFilterData from "~/filters/domain/TodoFilterData";

export default class StoreStateMother {
  public static createDefault(todoTasks: TodoTaskData[] = [], filters: TodoFilterData[] = todoFilterItems): StateData {
    return {
      todoTasks,
      filters,
      isGridView: true,
      nameSearch: "",
    };
  }
}
