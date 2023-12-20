import { TodoFilterId } from "~/filters/domain/TodoFilterId";

export default class TodoFilterMother {
  public static createFilter(id = TodoFilterId.All, active: boolean = true) {
    return { id, active: true };
  }
}
