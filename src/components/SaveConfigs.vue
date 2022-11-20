<script setup lang="ts">
import { ref, Ref } from "vue";
import XButton from "./inputs/XButton.vue";
import XSelect from "./inputs/XSelect.vue";
import XText from "./inputs/XText.vue";

defineProps({
  configNames: {
    type: Array,
    required: true,
  },
  selectedConfigName: {
    type: String,
    required: true,
  },
});

// emit config change and save
const emits = defineEmits(["config:load", "config:save"]);

const configName: Ref<string> = ref("");

const selectedConfig: Ref<string> = ref("");

const handleLoad = () => {
  configName.value = selectedConfig.value;
  emits("config:load", selectedConfig.value);
};

const handleSave = () => {
  emits("config:save", configName.value);
  selectedConfig.value = configName.value;
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Load or save config</h1>
    </div>
    <div class="flex flex-col space-y-4 bg-slate-50 rounded-md shadow p-2">
      <div class="flex w-full space-x-4">
        <x-select
          class="w-full"
          :modelValue="selectedConfig"
          label="Saved configs"
          :options="configNames"
          @update:modelValue="(newConfigName: string) => (selectedConfig = newConfigName)"
        ></x-select>
        <div class="flex items-center">
          <XButton @click="handleLoad">Load</XButton>
        </div>
      </div>
      <div class="flex w-full space-x-4">
        <x-text
          class="w-full"
          :modelValue="configName"
          label="Config name"
          @update:modelValue="(newConfigName: string) => (configName = newConfigName)"
        ></x-text>
        <div class="flex items-center">
          <XButton @click="handleSave">Save</XButton>
        </div>
      </div>
    </div>
  </div>
</template>
