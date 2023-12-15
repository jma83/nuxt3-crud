<script setup lang="ts">
const props = defineProps({
  errorMessage: { type: String, default: "" },
});
</script>

<template>
  <small class="errorMessage-paragraph">
    {{ props.errorMessage }}
  </small>
</template>

<style scoped>
.errorMessage-paragraph {
  width: 100%;
  height: 1rem;
  color: red;
}
</style>
