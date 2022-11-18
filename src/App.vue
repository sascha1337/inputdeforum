<script setup lang="ts">
import { ref, Ref } from "vue";
import FramesConfigComponent from "./components/FramesConfigComponent.vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import SaveConfigs from "./components/SaveConfigs.vue";
import { LocalStorage } from "./LocalStorage";
import Config from "./types/Config";
import Frame from "./types/Frame";

const config: Ref<Config> = ref(new Config());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");
const frameList: Ref<Frame[]> = ref([]);

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

const handleAddFrame = () => {
  frameList.value.push(new Frame());
};

const handleFrameListChange = (newFrameList: Frame[]) => {
  frameList.value = newFrameList;
  console.log(frameList);
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
      :frameList="frameList"
      @update:addFrame="handleAddFrame"
      @update:frameList="handleFrameListChange"
    />
  </div>
</template>
