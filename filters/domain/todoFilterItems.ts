import {TodoFilterId} from "~/filters/domain/TodoFilterId";
import TodoFilterData from "~/filters/domain/TodoFilterData";

export const todoFilterItems: TodoFilterData[] = [
  { id: TodoFilterId.All, active: true },
  { id: TodoFilterId.Active, active: false },
  { id: TodoFilterId.Done, active: false }
];