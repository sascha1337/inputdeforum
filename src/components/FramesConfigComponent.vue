<script setup lang="ts">
import Frame from "../types/Frame";
import XButton from "./inputs/XButton.vue";
import XNumber from "./inputs/XNumber.vue";
import XTextarea from "./inputs/XTextarea.vue";

const emit = defineEmits([
  "update:frameList",
  "update:addFrame",
  "update:addFrameBetween",
]);

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

const handleAddFrameBetween = (index: number) => {
  emit("update:addFrameBetween", index);
};

const handleDelete = (index: number) => {
  props.frameList.splice(index, 1);
  emit("update:frameList", props.frameList);
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold mb-5">Frames config</h1>
    </div>

    <div class="flex flex-col space-y-4">
      <div class="flex space-x-2">
        <div class="w-4"></div>
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
      </div>
      <div class="flex space-x-2">
        <div id="hue" class="w-4 rounded"></div>
        <div class="flex flex-col space-y-4">
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
              class=""
              :modelValue="(frame as Frame).noise_schedule"
              :min="0"
              :max="100"
              :step="0.001"
              @update:modelValue="(newNoiseSchedule: number) => (handleNumberChange(newNoiseSchedule, index, 'noise_schedule'))"
            ></XNumber>

            <XNumber
              class=""
              :modelValue="(frame as Frame).strength_schedule"
              :min="0"
              :max="100"
              :step="0.001"
              @update:modelValue="(newStrengthSchedule: number) => (handleNumberChange(newStrengthSchedule, index, 'strength_schedule'))"
            ></XNumber>

            <XNumber
              class=""
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
            <div class="flex justify-end items-center col-span-3 space-x-4">
              <!-- add frame -->
              <XButton
                class="bg-slate-200 hover:bg-slate-300 text-slate-800"
                @click="handleAddFrameBetween(index)"
              >
                Add frame
              </XButton>
              <XButton
                class="bg-slate-200 hover:bg-slate-300 text-slate-800"
                @click="handleDelete(index)"
              >
                Delete
              </XButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-5">
      <XButton @click="handleAddFrame">Add frame</XButton>
    </div>
  </div>
</template>

<style scoped>
#hue {
  background: linear-gradient(
    180deg,
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}
</style>
