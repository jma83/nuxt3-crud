<script setup lang="ts">
import type { Ref } from "vue";

const props = defineProps({ title: { type: String, required: true }, description: { type: String, required: true } });
const emit = defineEmits(["on-init", "on-confirm", "on-dismiss"]);
const modalRef: Ref<HTMLDialogElement | null> = ref(null);

const handleCloseModal = () => {
  modalRef.value !== null && modalRef.value!.close();
};

onMounted(() => {
  emit("on-init", modalRef);
});
</script>

<template>
  <dialog class="modalConfirmation-dialog" ref="modalRef" @click.self="handleCloseModal">
    <div class="modalConfirmation-container" @click.stop>
      <h2>{{ props.title }}</h2>
      <p>{{ props.description }}</p>
      <section class="modalConfirmation-section">
        <button class="modalConfirmation-button-primary" @click="emit('on-confirm')">Yes</button>
        <button class="modalConfirmation-button-secondary" @click="emit('on-dismiss')">No</button>
      </section>
    </div>
  </dialog>
</template>

<style scoped>
.modalConfirmation-dialog {
  width: fit-content;
  padding: 0;
}

.modalConfirmation-container {
  padding: 2rem;
}

.modalConfirmation-section {
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
}

.modalConfirmation-button-primary {
  background-color: var(--danger);
}

.modalConfirmation-button-primary:hover {
  background-color: var(--danger-hover);
}
</style>
