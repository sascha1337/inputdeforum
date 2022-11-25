<script setup lang="ts">
import { ref } from "vue";
import ToolTip from "../ToolTip.vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  tooltip: {
    type: String,
    required: false,
  },
  tooltipPosition: {
    type: String,
    required: false,
    default: "right",
  },
  required: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const hasError = ref(false);

const handleValueChange = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value;
  hasError.value = !validateValue(value);
  emits("update:modelValue", value);
};

const validateValue = (value: string): boolean => {
  if (props.required === true && value === "") {
    return false;
  }
  return true;
};
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-text-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      :class="{ 'text-red-500': hasError }"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
    <input
      class="border border-gray-300 rounded-md px-2 py-1 flex-grow focus:ring-2 focus:ring-offset-2 focus:outline-none"
      :class="{
        'w-full flex-grow-0': !label,
        'border-red-500': hasError,
        'focus:ring-blue-500': !hasError,
        'focus:ring-red-500': hasError,
      }"
      type="text"
      :id="`x-text-${label?.replaceAll(' ', '-').toLowerCase()}`"
      :value="modelValue"
      @input="handleValueChange"
    />
  </div>
</template>
