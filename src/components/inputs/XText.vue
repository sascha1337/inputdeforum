<script setup lang="ts">
import ToolTip from "../ToolTip.vue";

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
  <div class="flex space-x-4 items-start" :class="{ 'items-center': label }">
    <label
      v-if="label"
      :for="`x-text-${label.replaceAll(' ', '-').toLowerCase()}`"
      class="text-sm font-medium text-gray-700 w-1/5 text-right flex items-center justify-end space-x-2"
      ><span>{{ label }}</span>
      <ToolTip v-if="tooltip" :position="tooltipPosition">{{
        tooltip
      }}</ToolTip>
    </label>
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
