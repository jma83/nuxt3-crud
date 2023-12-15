<script setup lang="ts">
import type TodoTaskData from "~/tasks/domain/TodoTaskData";
import type { PropType } from "vue";

const props = defineProps({
  task: { type: Object as PropType<TodoTaskData>, required: true },
  isEdit: { type: Boolean, default: false },
});

const emit = defineEmits(["on-check"]);

const visibleTaskId = computed(() => {
  return `todoTask-${props.task.id.slice(0, 6)}`;
});

const onCheckedChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  return emit("on-check", { ...props.task, isDone: target.checked });
};
</script>

<template>
  <div class="todoTaskName" :class="{ 'todoTaskName-edit': isEdit }">
    <input
      class="todoTaskName-checkbox"
      type="checkbox"
      :checked="task.isDone"
      :id="visibleTaskId"
      :name="visibleTaskId"
      title="Mark as done"
      @change="onCheckedChange"
    />
    <label v-if="!isEdit" class="todoTaskName-label" :for="visibleTaskId" title="Mark as done">
      {{ task.name }}
    </label>
  </div>
</template>

<style scoped>
.todoTaskName {
  display: flex;
  align-items: center;
  width: 100%;
}

.todoTaskName-edit {
  width: fit-content;
}

.todoTaskName-label {
  width: 100%;
}
</style>
