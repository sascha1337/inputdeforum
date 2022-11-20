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

const handleAddFrameBetween = (index: number) => {
  config.value.frames.splice(index + 1, 0, new Frame());
};

const handleAutoSaveChange = (isAutoSaveEnabled: boolean) => {
  config.value.isAutoSaveEnabled = isAutoSaveEnabled;
};
</script>

<template>
  <div class="flex flex-col space-y-8 mx-4 my-4">
    <SaveConfigs
      :configNames="configNames"
      :selectedConfigName="selectedConfigName"
      :isAutoSaveEnabled="config.isAutoSaveEnabled"
      @config:load="handleConfigLoad"
      @config:save="handleConfigSave"
      @config:autosave="handleAutoSaveChange"
    />
    <GlobalConfigComponent
      :config="config"
      @update:configValue="handleConfigChange"
    />
    <FramesConfigComponent
      :frameList="config.frames"
      @update:addFrame="handleAddFrame"
      @update:frameList="handleFrameListChange"
      @update:addFrameBetween="handleAddFrameBetween"
    />

    <ConfigGenerator :config="config" />
  </div>
</template>
