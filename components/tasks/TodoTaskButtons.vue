<script setup lang="ts">
const emit = defineEmits(["on-click-edit", "on-click-delete"]);
</script>

<template>
  <div class="todoTaskButtons">
    <button
      class="todoTaskButtons-button todoTaskButtons-button-edit"
      type="button"
      aria-label="Edit task"
      title="Edit task"
      @click="emit('on-click-edit')"
    >
      <img alt="Edit" src="/icons/edit.svg" width="20" height="20" />
    </button>
    <button
      class="todoTaskButtons-button todoTaskButtons-button-delete"
      type="button"
      aria-label="Delete task"
      title="Delete task"
      @click="emit('on-click-delete')"
    >
      <img alt="Delete" src="/icons/delete.svg" width="20" height="20" />
    </button>
  </div>
</template>

<style scoped>
.todoTaskButtons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.todoTaskButtons-button {
  padding: 0.25rem 0.25rem;
}

.todoTaskButtons-button-edit {
  background-color: var(--secondary);
}

.todoTaskButtons-button-edit:hover {
  background-color: var(--secondary-hover);
}

.todoTaskButtons-button-delete {
  background-color: var(--danger);
}

.todoTaskButtons-button-delete:hover {
  background-color: var(--danger-hover);
}
</style>
