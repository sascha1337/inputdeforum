<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex space-x-4 items-center">
    <label
      :for="`x-checkbox-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right"
      >{{ label }}</label
    >
    <input
      class="border border-gray-300 rounded-md px-2 py-1"
      type="checkbox"
      :id="`x-checkbox-${label.replaceAll(' ', '-').toLowerCase()}`"
      :checked="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
  </div>
</template>
