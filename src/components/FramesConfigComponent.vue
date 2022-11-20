<script setup lang="ts">
import Frame from "../types/Frame";
import XButton from "./inputs/XButton.vue";
import XNumber from "./inputs/XNumber.vue";
import XTextarea from "./inputs/XTextarea.vue";

const emit = defineEmits(["update:frameList", "update:addFrame"]);

const props = defineProps({
  frameList: {
    type: Array,
    required: true,
  },
});

type NumberFrameKeys =
  | keyof Pick<Frame, "id">
  | keyof Pick<Frame, "angle">
  | keyof Pick<Frame, "zoom">
  | keyof Pick<Frame, "translation_x">
  | keyof Pick<Frame, "translation_y">
  | keyof Pick<Frame, "translation_z">
  | keyof Pick<Frame, "rotation_3d_x">
  | keyof Pick<Frame, "rotation_3d_y">
  | keyof Pick<Frame, "rotation_3d_z">
  | keyof Pick<Frame, "noise_schedule">
  | keyof Pick<Frame, "strength_schedule">
  | keyof Pick<Frame, "contrast_schedule">;
const handleNumberChange = (
  value: number,
  index: number,
  key: NumberFrameKeys
) => {
  (props.frameList[index] as Frame)[key] = value;
  emit("update:frameList", props.frameList);
};

const handlePromptChange = (value: string, index: number) => {
  (props.frameList[index] as Frame).prompt = String(value);
  emit("update:frameList", props.frameList);
};

const handleAddFrame = () => {
  emit("update:addFrame");
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Frames config</h1>
    </div>
    <div class="flex flex-col space-y-4">
      <div class="grid grid-cols-12 gap-2 font-bold uppercase p-2 items-end">
        <div class="row-span-2">#</div>
        <div class="col-span-3 row-span-2">Prompt</div>
        <div class="row-span-2">Angle</div>
        <div class="row-span-2">Zoom</div>
        <div>X</div>
        <div>Y</div>
        <div>Z</div>
        <div class="row-span-2">Noise</div>
        <div class="row-span-2">Strength</div>
        <div class="row-span-2">Contrast</div>
        <div>3D X</div>
        <div>3D Y</div>
        <div>3D Z</div>
      </div>
      <div
        class="grid grid-cols-12 gap-2 odd:bg-white even:bg-slate-50 rounded-md shadow p-2"
        v-for="(frame, index) in frameList"
      >
        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).id"
          :min="0"
          :max="100000"
          :step="1"
          @update:modelValue="(newId: number) => (handleNumberChange(newId, index, 'id'))"
        ></XNumber>

        <XTextarea
          class="col-span-3 row-span-2"
          :modelValue="(frame as Frame).prompt"
          @update:modelValue="(newPrompt: string) => (handlePromptChange(newPrompt, index))"
        ></XTextarea>

        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).angle"
          :min="0"
          :max="360"
          :step="0.001"
          @update:modelValue="(newAngle: number) => (handleNumberChange(newAngle, index, 'angle'))"
        ></XNumber>

        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).zoom"
          :min="0"
          :max="100"
          :step="0.001"
          @update:modelValue="(newZoom: number) => (handleNumberChange(newZoom, index, 'zoom'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).translation_x"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newTranslationX: number) => (handleNumberChange(newTranslationX, index, 'translation_x'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).translation_y"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newTranslationY: number) => (handleNumberChange(newTranslationY, index, 'translation_y'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).translation_z"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newTranslationZ: number) => (handleNumberChange(newTranslationZ, index, 'translation_z'))"
        ></XNumber>

        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).noise_schedule"
          :min="0"
          :max="100"
          :step="0.001"
          @update:modelValue="(newNoiseSchedule: number) => (handleNumberChange(newNoiseSchedule, index, 'noise_schedule'))"
        ></XNumber>

        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).strength_schedule"
          :min="0"
          :max="100"
          :step="0.001"
          @update:modelValue="(newStrengthSchedule: number) => (handleNumberChange(newStrengthSchedule, index, 'strength_schedule'))"
        ></XNumber>

        <XNumber
          class="row-span-2"
          :modelValue="(frame as Frame).contrast_schedule"
          :min="0"
          :max="100"
          :step="0.001"
          @update:modelValue="(newContrastSchedule: number) => (handleNumberChange(newContrastSchedule, index, 'contrast_schedule'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).rotation_3d_x"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newRotation3dX: number) => (handleNumberChange(newRotation3dX, index, 'rotation_3d_x'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).rotation_3d_y"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newRotation3dY: number) => (handleNumberChange(newRotation3dY, index, 'rotation_3d_y'))"
        ></XNumber>

        <XNumber
          :modelValue="(frame as Frame).rotation_3d_z"
          :min="-100"
          :max="100"
          :step="0.001"
          @update:modelValue="(newRotation3dZ: number) => (handleNumberChange(newRotation3dZ, index, 'rotation_3d_z'))"
        ></XNumber>
      </div>
    </div>
    <div class="flex justify-end mt-5">
      <XButton @click="handleAddFrame">Add frame</XButton>
    </div>
  </div>
</template>
