<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import FramesConfigComponent from "./components/FramesConfigComponent.vue";
import GlobalConfigComponent from "./components/GlobalConfigComponent.vue";
import JsonConfigGenerator from "./components/JsonConfigGenerator.vue";
import LoadOrSave from "./components/LoadOrSave.vue";
import { LocalStorage } from "./services/LocalStorage";
import Config from "./types/Config";
import Frame from "./types/Frame";
import UserConfig from "./types/UserConfig";
import SaveNotification from "./components/SaveNotification.vue";

const config: Ref<Config> = ref(new Config());
const userConfig: Ref<UserConfig> = ref(new UserConfig());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");
const isSaveNotificationVisible: Ref<boolean> = ref(false);
const saveNotificationTimeout: Ref<number | null> = ref(null);

const onConfigChange = () => {
  if (userConfig.value.isAutoSaveEnabled && selectedConfigName.value) {
    handleConfigSave(selectedConfigName.value);
    showSaveNotification();
  }
};

const showSaveNotification = () => {
  isSaveNotificationVisible.value = true;
  clearSaveNotificationTimeout();
  saveNotificationTimeout.value = setTimeout(() => {
    isSaveNotificationVisible.value = false;
  }, 3000);
};

const closeSaveNotification = () => {
  isSaveNotificationVisible.value = false;
  clearSaveNotificationTimeout();
};

const clearSaveNotificationTimeout = () => {
  if (saveNotificationTimeout.value) {
    clearTimeout(saveNotificationTimeout.value);
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

const handleUserConfigSave = () => {
  LocalStorage.saveUserConfig(userConfig.value);
};

const handleConfigDelete = (configName: string) => {
  LocalStorage.deleteConfig(configName);
  configNames.value = LocalStorage.getConfigNames();
  if (configName === selectedConfigName.value) {
    config.value = new Config();
    selectedConfigName.value = "";
  }
};

const handleConfigNameChange = (newConfigName: string) => {
  selectedConfigName.value = newConfigName;
};

onMounted(() => {
  userConfig.value = LocalStorage.getUserConfig() ?? new UserConfig();
});
</script>

<template>
  <div class="flex flex-col space-y-8 mx-4 my-4">
    <LoadOrSave
      :configNames="configNames"
      :selectedConfigName="selectedConfigName"
      @config:load="handleConfigLoad"
      @config:delete="handleConfigDelete"
      @config:name-changed="handleConfigNameChange"
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
    <JsonConfigGenerator :config="config" />
  </div>
  <SaveNotification
    :isSaveNotificationVisible="isSaveNotificationVisible"
    @save-notification:close="closeSaveNotification"
  />
</template>
