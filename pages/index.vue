<script setup lang="ts"></script>

<template>
  <div class="home">
    <h1>Todo List</h1>
    <div class="home-container">
      <TodoForm />
      <TodoFilters />
    </div>
  </div>
</template>

<style scoped>
.home {
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

  @media (min-width: $list-view-size) {
    width: 75%;
  }
}
</style>
