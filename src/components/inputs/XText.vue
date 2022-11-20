<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-text-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right"
      >{{ label }}</label
    >
    <input
      class="border border-gray-300 rounded-md px-2 py-1 flex-grow"
      :class="{ 'w-full flex-grow-0': !label }"
      type="text"
      :id="`x-text-${label?.replaceAll(' ', '-').toLowerCase()}`"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
