<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
  min: {
    type: Number,
    required: false,
    default: 0,
  },
  max: {
    type: Number,
    required: false,
    default: 0,
  },
  step: {
    type: Number,
    required: false,
    default: 1,
  },
});
</script>

<template>
  <div class="flex space-x-4 items-center">
    <label
      v-if="label"
      class="text-sm font-medium text-gray-700 w-1/5 text-right"
      >{{ label }}</label
    >
    <input
      class="border border-gray-300 rounded-md px-2 py-1 w-full"
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="
        $emit(
          'update:modelValue',
          Number(($event.target as HTMLInputElement).value)
        )
      "
    />
  </div>
</template>
