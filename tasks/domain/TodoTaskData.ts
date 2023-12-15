import { type Uuid } from "@/shared/types/Uuid";

export default interface TodoTaskData {
  id: Uuid;
  name: string;
  isDone: boolean;
}
