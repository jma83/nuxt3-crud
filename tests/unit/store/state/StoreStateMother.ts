import type StateData from "~/shared/stores/domain/StateData";
import { todoFilterItems } from "~/filters/domain/todoFilterItems";

export default class StoreStateMother {
  public static createDefault(): StateData {
    return {
      todoTasks: [],
      filters: [...todoFilterItems],
      isGridView: true,
      nameSearch: "",
    };
  }
}
