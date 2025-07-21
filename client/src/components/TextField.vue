<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Digite aqui'
  },
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:modelValue']);

const text = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<template>
  <div class="text-field">
    <input
      class="text-input"
      :type="type"
      v-model="text"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>
.text-field {
  margin-bottom: 1em;
}

.text-input {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 0.8rem 2rem;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}

.text-input:focus {
  outline: none;
  border-color: var(--primary);
}
</style>