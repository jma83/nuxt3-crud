<script setup lang="ts">
import GridViewFilter from "~/components/filters/GridViewFilter.vue";
import { useTaskStore } from "~/stores/TaskStore";
import type { Ref } from "vue";

const store = useTaskStore();

const searchInput: Ref<string> = ref("");

const handleInputSearch = () => {
  store.setNameSearch(searchInput.value);
};

const handleChangeViewFilter = (isGridView: boolean) => {
  store.setIsGridView(isGridView);
};
</script>

<template>
  <nav class="todoFilters">
    <ul class="todoFilters-list">
      <li v-for="filter in store.filters" :key="filter.id">
        <router-link
          :to="{ path: '/', query: { filter: filter.id } }"
          class="todoFilters-link"
          :class="{ 'todoFilters-link-active': filter.active }"
        >
          {{ filter.id }}
        </router-link>
      </li>
    </ul>
    <input
      v-model="searchInput"
      class="todoFilters-searchInput"
      placeholder="Search tasks"
      type="text"
      @input="handleInputSearch"
    />
    <GridViewFilter :isGridView="store.isGridView" @on-change-view-filter="handleChangeViewFilter" />
  </nav>
</template>

<style scoped>
.todoFilters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 1rem;
}

.todoFilters-list {
  width: fit-content;
  display: flex;
  flex-direction: row;
  padding: 0;
  list-style-type: none;
  gap: 1rem;
  margin-right: 0.5rem;
}

.todoFilters-link {
  text-transform: uppercase;
}

.todoFilters-link-active {
  font-weight: bold;
}

.todoFilters-searchInput {
  width: 90%;
  height: 1rem;
  padding: 0.4rem;
  max-width: var(--list-view-size);

  @media (min-width: 768px) {
    width: 20%;
    min-width: 8rem;
    max-width: 14rem;
  }
}
</style>
