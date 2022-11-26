<script setup lang="ts">
import { ref, Ref } from "vue";
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
  if (confirm("Are you sure you want to delete this config?")) {
    emits("config:delete");
    configName.value = "";
  }
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
    <div class="flex flex-col space-y-2 mb-5">
      <h2 class="text-2xl font-bold mb-2">Load or save config</h2>
      <p class="text-gray-600 text-sm">
        Every changes are automatically saved in your browser storage. ✨
      </p>
      <ul class="text-gray-600 text-sm list-disc ml-6">
        <li>
          To create a new config file, just change the config name and then
          change a parameter in the global or frames config.
        </li>
        <li>To load a saved config, select it in the dropdown.</li>
        <li>
          To delete a config, just select it and click on the delete button.
        </li>
      </ul>
      <p class="text-gray-600 text-sm">
        You can also download a backup of all your configs. (You will also be
        able to share your configs with others by importing files in a near
        future.)
      </p>
    </div>
    <div class="flex flex-col space-y-4 bg-gray-50 rounded-md shadow p-2">
      <div class="flex w-full space-x-4">
        <x-select
          class="w-full"
          :modelValue="selectedConfigName"
          label="Saved configs"
          :options="configNames"
          :nullable="true"
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
          <XButton @click="handleDelete" title="Delete a saved config"
            >Delete</XButton
          >
        </div>
      </div>
      <div class="flex w-full space-x-4 justify-end">
        <XButton
          @click="downloadBackup"
          title="Download a backup json file containing your data (importable in the future)"
          >Download backup</XButton
        >
        <!-- <div>or</div>
        <div class="flex">
          <input type="file" name="" id="" />
          <XButton>import</XButton>
        </div> -->
      </div>
    </div>
  </div>
</template>
