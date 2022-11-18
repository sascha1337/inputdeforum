<script setup lang="ts">
import { ref, Ref } from "vue";
import XButton from "./inputs/XButton.vue";
import { generateConfig } from "../services/configGenerator";
import Config from "../types/Config";

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

let code: Ref<string> = ref("");

const generateCode = async () => {
  code.value = await generateConfig(props.config as Config);
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Config generation</h1>
    </div>
    <div class="flex flex-col space-y-4">
      <!-- a "generate" xbutton component -->
      <div class="flex">
        <x-button @click="generateCode">Generate</x-button>
      </div>
      <!-- a textarea to put code generation result -->
      <div class="flex justify-center">
        <textarea
          class="border border-gray-300 rounded-md px-2 py-1 w-full"
          :value="code"
          rows="10"
          readonly
        >
        </textarea>
      </div>
    </div>
  </div>
</template>
