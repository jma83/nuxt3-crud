<script setup lang="ts">
const props = defineProps({
  isGridView: { type: Boolean, default: true },
});
const emit = defineEmits(["on-change-view-filter"]);

const onChangeViewFilter = () => emit("on-change-view-filter", isGridCheckbox.value);
const isGridCheckbox = ref(props.isGridView);
</script>

<template>
  <div class="gridViewFilter">
    |
    <input
      v-model="isGridCheckbox"
      class="gridViewFilter-checkbox"
      type="checkbox"
      name="grid-view"
      id="grid-view"
      @change="onChangeViewFilter"
    />
    <label for="grid-view">Grid</label>
  </div>
</template>

<style scoped>
.gridViewFilter {
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
}

.gridViewFilter-checkbox {
  margin-left: 1rem;
}
</style>
