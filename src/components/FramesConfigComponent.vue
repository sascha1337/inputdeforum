<script setup lang="ts">
import Frame from "../types/Frame";
import XButton from "./inputs/XButton.vue";
import XNumber from "./inputs/XNumber.vue";
import XTextarea from "./inputs/XTextarea.vue";
import ToolTip from "./ToolTip.vue";

const emit = defineEmits([
  "update:frameList",
  "update:addFrameBetween",
  "user-config:step-increment-change",
]);

const props = defineProps({
  frameList: {
    type: Array,
    required: true,
  },
  stepIncrement: {
    type: Number,
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

const handleAddFrameBetween = (index: number) => {
  emit("update:addFrameBetween", index);
};

const handleDelete = (index: number) => {
  props.frameList.splice(index, 1);
  emit("update:frameList", props.frameList);
};

const sortFramesById = () => {
  (props.frameList as Frame[]).sort((a, b) => a.id - b.id);
  emit("update:frameList", props.frameList);
};

const reorderFrames = () => {
  (props.frameList as Frame[]).forEach((frame, index) => {
    frame.id = index * props.stepIncrement;
  });
  emit("update:frameList", props.frameList);
};
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2 mb-5">
      <h2 class="text-2xl font-bold mb-2">Frames config</h2>
      <p class="text-gray-600 text-sm">
        Configure the frames of your animation. You can add, delete and reorder
        them.
      </p>
      <p class="text-gray-600 text-sm">
        Reindexing will change the id of each frame to a multiple of the step
        increment parameter.
      </p>
    </div>

    <div class="flex flex-col space-y-4">
      <div
        class="flex space-x-2 sticky top-0 z-20 backdrop-blur-md py-4 px-6 -mx-4 shadow-md"
      >
        <div class="w-4"></div>
        <div class="frames-header grid grid-cols-12 gap-2 items-end w-full">
          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold">ID</span>
            <ToolTip position="right">
              The frame id is used to determine the order of the frames.
              Duplicate ids could cause unexpected behavior.
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2 col-span-3 row-span-2">
            <span class="uppercase font-bold">Prompt</span>
            <ToolTip position="right">
              Prompt that will be use for frame generation.
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold">Angle</span>
            <ToolTip position="right">
              Operator to rotate canvas clockwise/anticlockwise in degrees per
              frame
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold">Zoom</span>
            <ToolTip position="right">
              Operator that scales the canvas size, multiplicatively [static =
              1.0]
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold"> X </span>
            <ToolTip position="right">
              Operator to move canvas left/right in pixels per frame
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold"> Y </span>
            <ToolTip position="right">
              Operator to move canvas up/down in pixels per frame
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold"> Z </span>
            <ToolTip position="right">
              Operator to move canvas in/out in pixels per frame
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold"> Noise </span>
            <ToolTip position="right">
              Amount of graininess to add per frame for diffusion diversity
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold"> Strength </span>
            <ToolTip position="left">
              Amount of presence of previous frame to influence next frame, also
              controls steps in the following formula [steps -
              (strength_schedule * steps)]
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold"> Contrast </span>
            <ToolTip position="left">
              Adjusts the overall contrast per frame [default neutral at 1.0]
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold">3D X</span>
            <ToolTip position="right">
              Operator to tilt canvas up/down in degrees per frame
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold">3D Y</span>
            <ToolTip position="right">
              Operator to pan canvas left/right in degrees per frame
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold">3D Z</span>
            <ToolTip position="right">
              Operator to roll canvas clockwise/anticlockwise
            </ToolTip>
          </div>
        </div>
      </div>
      <div class="flex space-x-2">
        <div id="hue" class="w-4 rounded"></div>
        <div class="flex flex-col space-y-4 w-full">
          <div
            class="grid grid-cols-12 gap-2 odd:bg-gray-50 even:bg-white rounded-md shadow p-2"
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
                colors="bg-gray-200 hover:bg-gray-300 text-gray-800"
                @click="handleAddFrameBetween(index)"
                title="Add a frame below this one"
              >
                Add frame
              </XButton>
              <XButton
                colors="bg-gray-200 hover:bg-gray-300 text-gray-800"
                @click="handleDelete(index)"
                title="Delete this frame"
              >
                Delete
              </XButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end items-center mt-5 space-x-4 w-full">
      <XNumber
        class="flex-grow"
        :modelValue="stepIncrement"
        :min="1"
        :max="100"
        :step="1"
        label="Steps increment"
        @update:modelValue="(newStepIncrement: number) => $emit('user-config:step-increment-change', newStepIncrement)"
      ></XNumber>
      <XButton @click="sortFramesById" title="Sort frames by ID">Sort</XButton>
      <XButton
        @click="reorderFrames"
        title="Reindex frames using steps increment"
        >Reindex</XButton
      >
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
