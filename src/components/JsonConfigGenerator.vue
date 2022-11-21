<script setup lang="ts">
import { computed } from "vue";
import { generateConfig } from "../services/configGenerator";
import Config from "../types/Config";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

const code = computed(() => {
  return String(generateConfig(props.config as Config));
});
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2 mb-5">
      <h2 class="text-2xl font-bold mb-2">Config generation</h2>
      <p class="text-gray-600 text-sm">
        The code below automatically reflects your changes. You can copy/paste
        it in your favorite Deforum tool.
      </p>
    </div>
    <div class="flex flex-col space-y-4 bg-gray-50 rounded-md shadow p-2">
      <div class="flex justify-center">
        <textarea
          class="border border-gray-300 rounded-md px-2 py-1 w-full font-mono"
          :value="code"
          rows="20"
          readonly
        >
        </textarea>
      </div>
    </div>
  </div>
</template>
