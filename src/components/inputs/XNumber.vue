<script setup lang="ts">
import ToolTip from "../ToolTip.vue";

const emits = defineEmits(["update:modelValue"]);

defineProps({
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
  tooltip: {
    type: String,
    required: false,
  },
  tooltipPosition: {
    type: String,
    required: false,
    default: "right",
  },
});

const handleValueChange = (event: Event) => {
  const value: string = (event.target as HTMLInputElement).value;
  let finalValue: Number | undefined = 0;
  if (value === "") {
    finalValue = undefined;
  } else {
    finalValue = Number(value);
  }
  emits("update:modelValue", finalValue);
};
</script>

<template>
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-number-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
    <input
      class="border border-gray-300 rounded-md px-2 py-1 flex-grow font-mono"
      :class="{ 'w-full flex-grow-0': !label }"
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
