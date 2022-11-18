<script setup lang="ts">
import { ref, Ref } from "vue";
import FramesConfigComponent from "./components/FramesConfigComponent.vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import ConfigGenerator from "./components/ConfigGenerator.vue";
import SaveConfigs from "./components/SaveConfigs.vue";
import { LocalStorage } from "./LocalStorage";
import Config from "./types/Config";
import Frame from "./types/Frame";

const config: Ref<Config> = ref(new Config());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");

const handleConfigChange = (newConfig: Config) => {
  config.value = newConfig;
};

const handleConfigLoad = (selectedConfigName: string) => {
  config.value = LocalStorage.getConfig(selectedConfigName) ?? new Config();
};

const handleConfigSave = (newConfigName: string) => {
  LocalStorage.saveConfig(newConfigName, config.value);
  configNames.value = LocalStorage.getConfigNames();
};

const handleAddFrame = () => {
  config.value.frames.push(new Frame());
};

const handleFrameListChange = (newFrameList: Frame[]) => {
  config.value.frames = newFrameList;
};
</script>

<template>
  <div class="flex flex-col space-y-8 mx-2 my-2">
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
    <FramesConfigComponent
      :frameList="config.frames"
      @update:addFrame="handleAddFrame"
      @update:frameList="handleFrameListChange"
    />

    <ConfigGenerator :config="config" />
  </div>
</template>
