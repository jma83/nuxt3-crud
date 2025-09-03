<script setup lang="ts">
import { nextTick, type PropType, type Ref } from "vue";
import { onMounted, ref } from 'vue'
import type TodoTaskData from "~/tasks/domain/TodoTaskData";

const emit = defineEmits(["on-input-edit", "on-submit-edit"]);
const props = defineProps({ task: { type: Object as PropType<TodoTaskData>, required: true } });
const inputEdit: Ref<string> = ref("");
const taskInputRef: Ref<HTMLInputElement | null> = ref(null);

onMounted(() => {
  inputEdit.value = props.task.name;
  nextTick(() => {
    taskInputRef.value!.focus();
  });
});

const handleSubmitEditedTask = (event: Event) => {
  const target: HTMLFormElement = event.target as HTMLFormElement;
  const fields = new window.FormData(target);
  const name = fields.get("taskName") as string;
  return emit("on-submit-edit", { ...props.task, name });
};

const handleInputEditTask = (event: Event) => {
  const target: HTMLInputElement = event.target as HTMLInputElement;
  return emit("on-input-edit", target.value);
};
</script>

<template>
  <form class="todoTaskEditForm" @submit.prevent="handleSubmitEditedTask">
    <input
      v-model="inputEdit"
      ref="taskInputRef"
      class="todoTaskEditForm-input"
      name="taskName"
      type="text"
      @change="handleInputEditTask"
      @input="handleInputEditTask"
      autofocus
    />
    <button class="todoTaskEditForm-button-edit" type="submit">Confirm</button>
  </form>
</template>

<style scoped>
.todoTaskEditForm {
  display: flex;
}

.todoTaskEditForm-button-edit {
  background-color: var(--secondary);

  &:hover {
    background-color: var(--secondary-hover);
  }
}

.todoTaskEditForm,
.todoTaskEditForm-input {
  width: inherit;
}
</style>
