import {TodoFilterId} from "~/filters/domain/TodoFilterId";

export default interface TodoFilterData {
  id: TodoFilterId;
  active: boolean;
}
