<script setup lang="ts">
import ToolTip from "../ToolTip.vue";

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
</script>

<template>
  <div class="flex space-x-4 items-center">
    <label
      :for="`x-checkbox-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip></label
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
