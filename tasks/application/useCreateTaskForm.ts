import type { Ref } from "vue";
import ValidateTaskNameFormat from "~/tasks/application/ValidateTaskNameFormat";
import type TaskValidationResponseData from "~/tasks/domain/TaskValidationResponseData";
import { useTaskStore } from "~/stores/TaskStore";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type { Uuid } from "~/shared/types/Uuid";

export default function useCreateTaskForm() {
  const inputText: Ref<string> = ref("");
  const errorMessage: Ref<string> = ref("");
  const validateTaskName: ValidateTaskNameFormat = new ValidateTaskNameFormat();
  const store = useTaskStore();
  const todoInputRef: Ref<HTMLInputElement | null> = ref(null);

  const focusInput = () => {
    todoInputRef.value !== null && todoInputRef.value!.focus();
  };

  const resetInputValue = () => {
    inputText.value = "";
  };

  const setError = (value: string) => {
    errorMessage.value = value;
  };

  const resetErrorMessage = () => {
    setError("");
  };

  const isCurrentInputTextValid = () => {
    const response: TaskValidationResponseData = validateTaskName.execute(inputText.value);
    if (response.error) {
      setError(response.error);
    }
    return response.isValid;
  };

  const getTaskId = (): Uuid => {
    return window.crypto.randomUUID();
  };

  const createNewTask = (name: string) => {
    const newTask: TodoTaskData = {
      id: getTaskId(),
      name,
      isDone: false,
    };
    store.addTodoTask(newTask);
  };

  const handleInputTextValue = () => {
    resetErrorMessage();
    isCurrentInputTextValid();
  };

  const handleSubmit = () => {
    if (!isCurrentInputTextValid()) {
      return focusInput();
    }
    createNewTask(inputText.value);
    resetInputValue();
    resetErrorMessage();
    focusInput();
  };

  return { inputText, errorMessage, todoInputRef, handleInputTextValue, handleSubmit };
}
