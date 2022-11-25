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
  maxTokenCount: {
    type: Number,
    required: false,
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
  if (props.maxTokenCount && value.split(" ").length > props.maxTokenCount) {
    return false;
  }
  return true;
};
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-textarea-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      :class="{ 'text-red-500': hasError }"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
    <textarea
      class="border border-gray-300 rounded-md px-2 py-1 w-full focus:ring-2 focus:ring-offset-2 focus:outline-none"
      :class="{
        'border-red-500': hasError,
        'focus:ring-blue-500': !hasError,
        'focus:ring-red-500': hasError,
      }"
      :id="`x-textarea-${label?.replaceAll(' ', '-').toLowerCase()}`"
      type="text"
      rows="2"
      :value="modelValue"
      @input="handleValueChange"
    >
    </textarea>
  </div>
</template>
