<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
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
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
