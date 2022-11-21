<script setup lang="ts">
import Config from "../types/Config";
import XText from "./inputs/XText.vue";
import XNumber from "./inputs/XNumber.vue";
import XSelect from "./inputs/XSelect.vue";
import {
  samplerList,
  seedBehaviorList,
  Sampler,
  SeedBehavior,
} from "../types/enums";

const emit = defineEmits(["update:configValue"]);

const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
});

type NumberConfigKeys =
  | keyof Pick<Config, "steps">
  | keyof Pick<Config, "width">
  | keyof Pick<Config, "height">
  | keyof Pick<Config, "seed">
  | keyof Pick<Config, "scale">
  | keyof Pick<Config, "ddim_eta">;

const handleNumberChange = (value: number, key: NumberConfigKeys) => {
  props.config[key] = Number(value);
  emit("update:configValue", props.config);
};

type StringConfigKeys = keyof Pick<Config, "batch_name">;

const handleStringChange = (value: string, key: StringConfigKeys) => {
  props.config[key] = String(value);
  emit("update:configValue", props.config);
};

type SamplerConfigKeys = keyof Pick<Config, "sampler">;

const handleSamplerChange = (value: Sampler, key: SamplerConfigKeys) => {
  props.config[key] = value;
  emit("update:configValue", props.config);
};

type SeedBehaviorConfigKeys = keyof Pick<Config, "seed_behavior">;

const handleSeedBehaviorChange = (
  value: SeedBehavior,
  key: SeedBehaviorConfigKeys
) => {
  props.config[key] = value;
  emit("update:configValue", props.config);
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Global config</h1>
    </div>
    <div class="flex flex-col space-y-4 bg-gray-50 rounded-md shadow p-2">
      <x-text
        label="Batch name"
        tooltip="The name of the batch. This will be used as folder name for the generated images."
        :modelValue="config.batch_name"
        @update:modelValue="(newBatchName: string) => (handleStringChange(newBatchName, 'batch_name'))"
      ></x-text>

      <x-number
        label="Width"
        :modelValue="config.width"
        :min="0"
        :max="2048"
        :step="1"
        @update:modelValue="(newWidth: number) => (handleNumberChange(newWidth, 'width'))"
        tooltip="The width of the generated images. [512, 2048]"
      ></x-number>

      <x-number
        label="Height"
        :modelValue="config.height"
        :min="0"
        :max="2048"
        :step="1"
        @update:modelValue="(newHeight: number) => (handleNumberChange(newHeight, 'height'))"
        tooltip="The height of the generated images. [512, 2048]"
      ></x-number>

      <x-number
        label="Seed"
        :modelValue="config.seed"
        :min="-1"
        :max="1000000"
        :step="1"
        @update:modelValue="(newSeed: number) => (handleNumberChange(newSeed, 'seed'))"
        tooltip="The seed used for the generation. If set to -1, a random seed will be used. [-1, 1000000]"
      ></x-number>

      <x-select
        label="Seed behavior"
        :modelValue="config.seed_behavior"
        :options="seedBehaviorList"
        @update:modelValue="(newSeedBehavior: SeedBehavior) => (handleSeedBehaviorChange(newSeedBehavior, 'seed_behavior'))"
        tooltip="The behavior of the seed. If set to 'iter', the seed will be incremented for each image."
      ></x-select>

      <x-select
        label="Sampler"
        :modelValue="config.sampler"
        :options="samplerList"
        @update:modelValue="(newSampler: Sampler) => (handleSamplerChange(newSampler, 'sampler'))"
        tooltip="The sampler used for the generation. Report to the documentation for more information."
      ></x-select>

      <x-number
        label="Steps"
        :modelValue="config.steps"
        :min="0"
        :max="1000"
        :step="1"
        @update:modelValue="(newSteps: number) => (handleNumberChange(newSteps, 'steps'))"
        tooltip="The number of steps used for the first generation. [0, 1000]"
      ></x-number>

      <!-- scale -->
      <x-number
        label="Scale"
        :modelValue="config.scale"
        :min="0"
        :max="50"
        :step="1"
        @update:modelValue="(newScale: number) => (handleNumberChange(newScale, 'scale'))"
        tooltip="A measurement of how much enforcement to apply to an overall prompt. [0, 50]"
      ></x-number>

      <!-- ddim_eta -->
      <x-number
        label="Ddim eta"
        :modelValue="config.ddim_eta"
        :min="0"
        :max="1"
        :step="0.001"
        @update:modelValue="(newDdimEta: number) => (handleNumberChange(newDdimEta, 'ddim_eta'))"
        tooltip="ONLY enabled in ddim sampler mode, will control a ratio of ddim to ddpm sampling methods, with a range of -1 to +1 with 0 being less randomized determinism. [-1, 1]"
      ></x-number>
    </div>
  </div>
</template>
