<script setup lang="ts">
import type { ComputedRef } from "vue";
import { useTaskStore } from "~/stores/TaskStore";

const store = useTaskStore();
const isEmptyTasks: ComputedRef<boolean> = computed(() => {
  return !store.todoTasks.length;
});
</script>

<template>
  <div class="home">
    <h1>Todo List</h1>
    <div class="home-container">
      <TodoForm />
      <TodoList>
        <TodoFilters v-if="!isEmptyTasks" />
      </TodoList>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    width: 75%;
  }
}
</style>
