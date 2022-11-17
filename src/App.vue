<script setup lang="ts">
import { ref, Ref } from "vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import SaveConfigs from "./components/SaveConfigs.vue";
import { LocalStorage } from "./LocalStorage";
import Config from "./types/Config";

const config: Ref<Config> = ref(new Config());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");

const handleConfigChange = (newConfig: Config) => {
  config.value = newConfig;
  console.log(config);
};

const handleConfigLoad = (selectedConfigName: string) => {
  console.log(selectedConfigName);
  config.value = LocalStorage.getConfig(selectedConfigName) ?? new Config();
};

const handleConfigSave = (newConfigName: string) => {
  console.log(newConfigName);
  LocalStorage.saveConfig(newConfigName, config.value);
  configNames.value = LocalStorage.getConfigNames();
};
</script>

<template>
  <div class="flex flex-col space-y-8">
    <SaveConfigs
      :configNames="configNames"
      :selectedConfigName="selectedConfigName"
      @config:load="handleConfigLoad"
      @config:save="handleConfigSave"
    />
    <GlobalConfigComponent
      :config="config"
      @update:configValue="handleConfigChange"
    />
  </div>
</template>
