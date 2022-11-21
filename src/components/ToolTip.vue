<script setup lang="ts">
import { InformationCircleIcon } from "@heroicons/vue/20/solid";

defineProps({
  position: {
    type: String,
    required: false,
    default: "right",
  },
});
</script>

<template>
  <!-- tooltip icon -->
  <div class="tooltip flex items-center">
    <span class="sr-only">ToolTip</span>
    <InformationCircleIcon class="h-5 w-5 cursor-pointer" aria-hidden="true" />
    <span class="tooltiptext text-sm" :class="position">
      <slot />
    </span>
  </div>
</template>

<style scoped>
.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: justify;
  border-radius: 6px;
  padding: 8px 10px;
  position: absolute;
  z-index: 100;
}

.tooltip .tooltiptext.left {
  top: -5px;
  right: 110%;
}

.tooltip .tooltiptext.right {
  top: -5px;
  left: 110%;
}

.tooltip .tooltiptext.bottom {
  top: 100%;
  margin-top: 3px;
  margin-left: -75px;
}

.tooltip .tooltiptext.top {
  bottom: 21px;
  margin-left: -70px;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  z-index: 20;
}

.tooltip .tooltiptext.right::after {
  top: 15px;
  left: -10px;
  border-color: transparent black transparent transparent;
}

.tooltip .tooltiptext.left::after {
  top: 14%;
  left: 100%;
  border-color: transparent transparent transparent black;
}

.tooltip .tooltiptext.top::after {
  top: 104%;
  left: 46%;
  border-color: black transparent transparent transparent;
}

.tooltip .tooltiptext.bottom::after {
  bottom: 100%;
  left: 50%;
  border-color: transparent transparent black transparent;
}
</style>
