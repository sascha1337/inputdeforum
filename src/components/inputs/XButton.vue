<script setup lang="ts">
defineProps({
  colors: {
    type: String,
    required: false,
    default: "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-300",
  },
});
</script>
<template>
  <button
    class="font-bold py-1 px-2 rounded text-xs shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none"
    :class="colors"
  >
    <slot></slot>
  </button>
</template>
