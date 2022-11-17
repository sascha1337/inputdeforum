<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
    required: true,
    default: "",
  },
  label: {
    type: String,
    required: true,
    default: "",
  },
  options: {
    type: Array,
    required: true,
    default: [],
  },
});
</script>

<template>
  <div class="flex space-x-4 items-center">
    <label class="text-sm font-medium text-gray-700 w-1/5 text-right">{{
      label
    }}</label>
    <select
      class="border border-gray-300 rounded-md px-2 py-1 flex-grow"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    >
      <option v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>
