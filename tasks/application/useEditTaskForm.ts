import type { Ref } from "vue";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import type { Uuid } from "~/shared/types/Uuid";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type TaskValidationResponseData from "~/tasks/domain/TaskValidationResponseData";
import ValidateTaskNameFormat from "~/tasks/application/ValidateTaskNameFormat";
import type { AtLeast } from "~/shared/types/AtLeast";

export default function useEditTaskForm(store: StoreData) {
  let editTaskId: Ref<Uuid | null> = ref(null);
  const errorMessage: Ref<string> = ref("");
  const validateTaskName: ValidateTaskNameFormat = new ValidateTaskNameFormat();

  const setError = (value: string) => {
    errorMessage.value = value;
  };

  const isInputTextValid = (inputText: string) => {
    const response: TaskValidationResponseData = validateTaskName.execute(inputText);
    if (response.error) {
      setError(response.error);
    }
    return response.isValid;
  };

  const handleInputTextValue = (inputValue: string) => {
    resetErrorMessage();
    isInputTextValid(inputValue);
  };

  const resetErrorMessage = () => {
    setError("");
  };

  const saveEditTaskId = (value: Uuid) => {
    console.log("save!", value);
    editTaskId.value = value;
  };

  const clearSavedEditTaskId = () => {
    console.log("clear!!");
    editTaskId.value = null;
  };

  const handleStartEditingTask = (taskId: Uuid) => {
    resetErrorMessage();
    saveEditTaskId(taskId);
  };

  const handleCheckTaskById = (todoTask: TodoTaskData) => {
    console.log("todo", todoTask);
    store.editTodoTaskById(todoTask);
  };

  const editCurrentTask = (editedTask: AtLeast<TodoTaskData, "name">) => {
    console.log("editedTask", editedTask);
    if (!isInputTextValid(editedTask.name) || editTaskId.value === null) {
      console.log("aaa", isInputTextValid(editedTask.name));
      return;
    }
    console.log("next");
    store.editTodoTaskById({ ...editedTask, id: editTaskId.value });
    clearEditData();
  };

  const clearEditData = () => {
    clearSavedEditTaskId();
    resetErrorMessage();
  };

  return {
    handleStartEditingTask,
    editCurrentTask,
    handleInputTextValue,
    handleCheckTaskById,
    errorMessageOnEdit: errorMessage,
    editTaskId,
  };
}
