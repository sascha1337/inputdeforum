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
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";

const config: Ref<Config> = ref(new Config());
const userConfig: Ref<UserConfig> = ref(new UserConfig());
const configNames: Ref<string[]> = ref(LocalStorage.getConfigNames());
const selectedConfigName: Ref<string> = ref("");
const isSaveNotificationVisible: Ref<boolean> = ref(false);
// timeout for save notification
const saveNotificationTimeout: Ref<number | null> = ref(null);

const onConfigChange = () => {
  if (userConfig.value.isAutoSaveEnabled && selectedConfigName.value) {
    handleConfigSave(selectedConfigName.value);
    showSaveNotification();
  }
};

const showSaveNotification = () => {
  isSaveNotificationVisible.value = true;
  if (saveNotificationTimeout.value) {
    clearTimeout(saveNotificationTimeout.value);
  }
  saveNotificationTimeout.value = setTimeout(() => {
    isSaveNotificationVisible.value = false;
  }, 3000);
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
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="trangray-y-2 opacity-0 sm:trangray-y-0 sm:trangray-x-2"
        enter-to-class="trangray-y-0 opacity-100 sm:trangray-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isSaveNotificationVisible"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon
                  class="h-6 w-6 text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  Successfully saved!
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="isSaveNotificationVisible = false"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
