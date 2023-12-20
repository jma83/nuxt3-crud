import type TodoTaskData from "~/tasks/domain/TodoTaskData";

const crypto = require("crypto");
const defaultTaskName: string = "Test my app";

export default class TodoTaskMother {
  public static createActiveTask(name: string = defaultTaskName, id = crypto.randomUUID()): TodoTaskData {
    return {
      id,
      isDone: false,
      name,
    };
  }
}
