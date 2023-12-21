<script setup lang="ts">
import TodoTask from "~/components/tasks/TodoTask.vue";
import ModalConfirmation from "~/components/modals/ModalConfirmation.vue";
import useModalConfirmation from "~/shared/modals/useModalConfirmation";
import useDeleteTask from "~/tasks/application/useDeleteTask";
import useEditTaskForm from "~/tasks/application/useEditTaskForm";
import { useTaskStore } from "~/stores/TaskStore";
import type { StoreData } from "~/shared/stores/domain/StoreData";
import type { Uuid } from "~/shared/types/Uuid";
import type { ComputedRef, PropType } from "vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";

const store: StoreData = useTaskStore();

const todoTasks: ComputedRef<TodoTaskData[]> = computed(() => {
  return store.filteredTodoTasks;
});

const isGridView: ComputedRef<boolean> = computed(() => {
  return store.isGridView;
});

const props = defineProps({
  initialEditId: { type: Object as PropType<Uuid | null>, default: null },
  initialDeleteId: { type: Object as PropType<Uuid | null>, default: null },
});

const { initialEditId, initialDeleteId } = props;

const { handleInitModal, openModal, closeModal } = useModalConfirmation();
const { deleteCurrentTask, clearDeleteTaskData, saveDeleteTaskId, errorMessageOnDelete, deleteTaskId } = useDeleteTask(
  store,
  initialDeleteId,
);
const {
  handleStartEditingTask,
  editCurrentTask,
  handleInputTextValue,
  handleCheckTaskById,
  errorMessageOnEdit,
  editTaskId,
} = useEditTaskForm(store, initialEditId);

const handleDeleteTask = (taskId: Uuid) => {
  saveDeleteTaskId(taskId);
  openModal();
};

const handleConfirmDeleteTask = () => {
  deleteCurrentTask();
  closeModal();
};

const handleCloseModal = () => {
  clearDeleteTaskData();
  closeModal();
};

const errorMessage = computed(() => {
  return errorMessageOnDelete.value || errorMessageOnEdit.value;
});

const gridViewClass = computed(() => {
  return isGridView.value ? "todoList-list-grid" : "todoList-list-linear";
});

const isCurrentFilterEmpty = computed(() => {
  return store.todoTasks.length && !todoTasks.value.length;
});

const getErrorMessageForTaskId = (taskId: Uuid) => {
  return deleteTaskId.value === taskId || editTaskId.value === taskId ? errorMessage.value : "";
};
</script>

<template>
  <section class="todoList-section">
    <slot />
    <p v-if="isCurrentFilterEmpty">No results for current filters</p>
    <ul v-else class="todoList-list" :class="gridViewClass">
      <TodoTask
        v-for="task in todoTasks"
        :key="task.id"
        :task="task"
        :is-edit="editTaskId === task.id"
        :error-message="getErrorMessageForTaskId(task.id)"
        class="todoList-item"
        @on-check="handleCheckTaskById"
        @on-input-edit="handleInputTextValue"
        @on-click-edit="handleStartEditingTask"
        @on-click-delete="handleDeleteTask"
        @on-submit-edit="editCurrentTask"
      />
    </ul>
    <ModalConfirmation
      title="Confirm delete action"
      description="Are you sure you want to delete this Todo task?"
      @on-init="handleInitModal"
      @on-confirm="handleConfirmDeleteTask"
      @on-dismiss="handleCloseModal"
    />
  </section>
</template>

<style scoped>
.todoList-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.todoList-list {
  width: 100%;
  padding: 0;
  list-style-type: none;
  gap: 1rem;
  text-align: start;
  display: grid;
  grid-auto-flow: dense;
}

.todoList-list-grid {
  grid-template-columns: 1fr;
  max-width: var(--list-view-size);
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(23rem, 1fr));
    max-width: 100%;
  }
}

.todoList-list-linear {
  grid-template-columns: 1fr;
  max-width: var(--list-view-size);
}
</style>
