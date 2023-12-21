import type { Ref } from "vue";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import type { Uuid } from "~/shared/types/Uuid";

const DEFAULT_DELETE_ERROR: string = "An error has occurred while deleting the task. Please, try again later.";

export default function useDeleteTask(store: StoreData, initialDeleteId: Uuid | null) {
  const deleteTaskId: Ref<Uuid | null> = ref(initialDeleteId);
  const errorMessage: Ref<string> = ref("");

  const setDeleteErrorMessage = () => {
    errorMessage.value = DEFAULT_DELETE_ERROR;
  };

  const resetDeleteErrorMessage = () => {
    errorMessage.value = "";
  };

  const saveDeleteTaskId = (value: Uuid) => {
    deleteTaskId.value = value;
  };

  const clearSavedDeleteTaskId = () => {
    deleteTaskId.value = null;
  };

  const deleteCurrentTask = () => {
    if (deleteTaskId.value === null) {
      return;
    }
    store.deleteTodoTaskById(deleteTaskId.value);
    clearDeleteTaskData();
  };

  const clearDeleteTaskData = () => {
    clearSavedDeleteTaskId();
    resetDeleteErrorMessage();
  };

  return {
    saveDeleteTaskId,
    clearDeleteTaskData,
    deleteCurrentTask,
    setDeleteErrorMessage,
    errorMessageOnDelete: errorMessage,
    deleteTaskId,
  };
}
