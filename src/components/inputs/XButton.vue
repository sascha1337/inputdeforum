<script setup lang="ts">
defineProps({
  colors: {
    type: String,
    required: false,
    default: "bg-blue-500 hover:bg-blue-700 text-white",
  },
});
</script>
<template>
  <button
    class="font-bold py-1 px-2 rounded-md text-xs shadow-sm hover:shadow-md transition-all"
    :class="colors"
  >
    <slot></slot>
  </button>
</template>
