<script setup lang="ts">
import { ref } from "vue";
import ToolTip from "../ToolTip.vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
  step: {
    type: Number,
    required: false,
    default: 1,
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
  let finalValue: Number | undefined = 0;
  if (value === "") {
    finalValue = undefined;
  } else {
    finalValue = Number(value);
  }
  hasError.value = !validateValue(finalValue);
  emits("update:modelValue", finalValue);
};

const validateValue = (value: Number | undefined): boolean => {
  if (props.required === true && value === undefined) {
    return false;
  } else if (value === undefined) {
    return true;
  }

  if (isNaN(value!.valueOf())) {
    return false;
  }
  if (props.min !== undefined && value! < props.min) {
    return false;
  }
  if (props.max !== undefined && value! > props.max) {
    return false;
  }
  return true;
};
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-number-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      :class="{ 'text-red-500': hasError }"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
    <input
      class="outline-0 border border-gray-300 rounded-md px-2 py-1 flex-grow font-mono"
      :class="{ 'w-full flex-grow-0': !label, 'border-red-500': hasError }"
      type="number"
      :id="`x-number-${label?.replaceAll(' ', '-').toLowerCase()}`"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      @input="handleValueChange"
    />
  </div>
</template>
