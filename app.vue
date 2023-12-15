<script setup></script>

<template>
  <div class="app">
    <nav class="app-nav">
      <ul class="app-list">
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>
    <NuxtPage />
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app-nav {
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
}

.app-list {
  padding: 0 1rem;
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: 3rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.app-list > li {
  font-size: 1.25rem;
}
</style>
