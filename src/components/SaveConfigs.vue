<script setup lang="ts">
import { computed, ref, Ref, watch } from "vue";
import { LocalStorage } from "../services/LocalStorage";
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

const emits = defineEmits([
  "config:load",
  "config:name-changed",
  "config:delete",
]);

const configName: Ref<string> = ref("");

const handleLoad = (newConfigName: string) => {
  configName.value = newConfigName;
  emits("config:load", newConfigName);
};

const handleDelete = () => {
  emits("config:delete", configName.value);
  configName.value = "";
};

const downloadBackup = () => {
  const backup: string = LocalStorage.getBackup();
  const element = document.createElement("a");
  const file = new Blob([backup], { type: "application/json" });
  element.href = URL.createObjectURL(file);
  element.download = "backup.json";
  element.click();
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Load or save config</h1>
    </div>
    <div class="flex flex-col space-y-4 bg-gray-50 rounded-md shadow p-2">
      <div class="flex w-full space-x-4">
        <x-select
          class="w-full"
          :modelValue="selectedConfigName"
          label="Saved configs"
          :options="configNames"
          @update:modelValue="(newConfigName: string) => handleLoad(newConfigName)"
        ></x-select>
      </div>
      <div class="flex w-full space-x-4">
        <x-text
          class="w-full"
          :modelValue="configName"
          label="Config name"
          @update:modelValue="
            (newConfigName) => $emit('config:name-changed', newConfigName)
          "
        ></x-text>
        <div class="flex items-center">
          <XButton @click="handleDelete">Delete</XButton>
        </div>
      </div>
      <div class="flex w-full space-x-4 justify-end">
        <XButton @click="downloadBackup">Download backup</XButton>
        <!-- <div>or</div>
        <div class="flex">
          <input type="file" name="" id="" />
          <XButton>import</XButton>
        </div> -->
      </div>
    </div>
  </div>
</template>
