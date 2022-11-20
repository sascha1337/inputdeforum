<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import FramesConfigComponent from "./components/FramesConfigComponent.vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import ConfigGenerator from "./components/ConfigGenerator.vue";
import SaveConfigs from "./components/SaveConfigs.vue";
import { LocalStorage } from "./services/LocalStorage";
import Config from "./types/Config";
import Frame from "./types/Frame";
import UserConfig from "./types/UserConfig";

const config: Ref<Config> = ref(new Config());
const userConfig: Ref<UserConfig> = ref(new UserConfig());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");

const onConfigChange = () => {
  if (userConfig.value.isAutoSaveEnabled) {
    handleConfigSave(selectedConfigName.value);
  }
};

const handleConfigChange = (newConfig: Config) => {
  config.value = newConfig;
  onConfigChange();
};

const handleConfigLoad = (newSelectedConfigName: string) => {
  config.value = LocalStorage.getConfig(newSelectedConfigName) ?? new Config();
  selectedConfigName.value = newSelectedConfigName;
};

const handleConfigSave = (newConfigName: string) => {
  if (newConfigName === "") {
    alert("Please enter a name for your config");
    return;
  }
  LocalStorage.saveConfig(newConfigName, config.value);
  configNames.value = LocalStorage.getConfigNames();
};

const handleAddFrame = () => {
  config.value.frames.push(new Frame());
  onConfigChange();
};

const handleFrameListChange = (newFrameList: Frame[]) => {
  config.value.frames = newFrameList;
  onConfigChange();
};

const handleAddFrameBetween = (index: number) => {
  config.value.frames.splice(index + 1, 0, new Frame());
  onConfigChange();
};

const handleAutoSaveChange = (isAutoSaveEnabled: boolean) => {
  userConfig.value.isAutoSaveEnabled = isAutoSaveEnabled;
  handleUserConfigSave();
};

const handleUserConfigSave = () => {
  LocalStorage.saveUserConfig(userConfig.value);
};

onMounted(() => {
  userConfig.value = LocalStorage.getUserConfig() ?? new UserConfig();
});
</script>

<template>
  <div class="flex flex-col space-y-8 mx-4 my-4">
    <SaveConfigs
      :configNames="configNames"
      :selectedConfigName="selectedConfigName"
      :isAutoSaveEnabled="userConfig.isAutoSaveEnabled"
      @config:load="handleConfigLoad"
      @config:save="handleConfigSave"
      @config:onConfigChange="handleAutoSaveChange"
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
