<script setup lang="ts">
import useCreateTaskForm from "~/tasks/application/useCreateTaskForm";

const props = defineProps({
  initInputText: { type: String, default: "" },
  initErrorMessage: { type: String, default: "" },
});
const { initInputText, initErrorMessage } = props;
const { todoInputRef, handleInputTextValue, inputText, errorMessage, handleSubmit } = useCreateTaskForm({
  initInputText,
  initErrorMessage,
});
</script>

<template>
  <section class="todoForm-section">
    <form class="todoForm-form" aria-label="Form" @submit.prevent="handleSubmit">
      <label for="todoInput" class="todoForm-label">What needs to be done?</label>
      <div class="todoForm-formDivider">
        <input
          v-model="inputText"
          ref="todoInputRef"
          class="todoForm-input"
          id="todoInput"
          name="todoInput"
          aria-label="Todo Input"
          type="text"
          placeholder="Homework, shopping..."
          @input="handleInputTextValue"
          autofocus
        />
        <button class="todoForm-button" type="submit">Create</button>
      </div>
    </form>
    <SharedErrorMessage :error-message="errorMessage" :is-fixed-height="true" />
  </section>
</template>

<style scoped>
.todoForm-section {
  margin-top: 1rem;
  text-align: start;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: var(--list-view-size);
}

.todoForm-form {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
}

.todoForm-label {
  text-align: start;
}

.todoForm-input {
  width: 100%;
  padding: 0.5rem 0.5rem;
}

.todoForm-button {
  width: fit-content;
  padding: 0.5rem 0.5rem;
  background-color: var(--primary);

  &:hover {
    background-color: var(--primary-hover);
  }
}

.todoForm-formDivider {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .todoForm-formDivider {
    flex-wrap: nowrap;
  }
}
</style>
