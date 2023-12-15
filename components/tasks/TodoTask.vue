<script setup lang="ts">
import type { ComputedRef, PropType } from "vue";
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import ErrorMessage from "~/components/shared/ErrorMessage.vue";
import TodoTaskButtons from "~/components/tasks/TodoTaskButtons.vue";
import TodoTaskEditForm from "~/components/tasks/TodoTaskEditForm.vue";
import TodoTaskName from "~/components/tasks/TodoTaskName.vue";
import type { Uuid } from "~/shared/types/Uuid";

const props = defineProps({
  task: { type: Object as PropType<TodoTaskData>, required: true },
  isEdit: { type: Boolean, default: false },
  errorMessage: { type: String, default: "" },
});

const emit = defineEmits(["on-check", "on-input-edit", "on-submit-edit", "on-click-edit", "on-click-delete"]);

const taskId: ComputedRef<Uuid> = computed(() => {
  return props.task!.id;
});
</script>

<template>
  <li class="todoTask-item">
    <div class="todoTask-container" :class="{ 'todoTask-container-edit': isEdit }">
      <TodoTaskName :task="task" :is-edit="isEdit" @on-check="emit('on-check', $event)" />
      <div v-if="isEdit" class="todoTask-content">
        <TodoTaskEditForm
          :task="task"
          @on-input-edit="emit('on-input-edit', $event)"
          @on-submit-edit="emit('on-submit-edit', $event)"
        />
        <ErrorMessage :error-message="errorMessage" />
      </div>
      <TodoTaskButtons
        v-if="!isEdit"
        :task-id="taskId"
        @on-click-delete="emit('on-click-delete', task.id)"
        @on-click-edit="emit('on-click-edit', task.id)"
      />
    </div>
    <ErrorMessage v-if="errorMessage.length > 0 && !isEdit" :error-message="errorMessage" />
  </li>
</template>

<style scoped>
.todoTask-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background-color: var(--card-primary);
}

.todoTask-item:hover {
  background-color: var(--card-primary-hover);
}

.todoTask-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todoTask-container-edit {
  align-items: baseline;
}

.todoTask-content {
  width: inherit;
  display: flex;
  flex-direction: column;
}
</style>
