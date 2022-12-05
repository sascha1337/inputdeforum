<script setup lang="ts">
import { ref } from "vue";
import Frame from "../types/Frame";
import XButton from "./inputs/XButton.vue";
import XExpression from "./inputs/XExpression.vue";
import XNumber from "./inputs/XNumber.vue";
import XTextarea from "./inputs/XTextarea.vue";
import XCheckbox from "./inputs/XCheckbox.vue";
import ToolTip from "./ToolTip.vue";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits([
  "update:frameList",
  "update:addFrameBetween",
  "user-config:step-increment-change",
  "user-config:expression-mode-change",
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
  isExpressionModeEnabled: {
    type: Boolean,
    required: true,
  },
});

interface ErrorMessage {
  message: string;
  input: HTMLInputElement;
}

const errors = ref<Map<number, Map<string, ErrorMessage>>>(new Map());

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
  ((props.frameList[index] as Frame)[key] as number) = value;
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
  if (props.frameList.length === 1) {
    return;
  }
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

const handleErrorMessage = (
  message: string | undefined,
  input: HTMLInputElement,
  index: number,
  key: string
) => {
  if (message === undefined) {
    errors.value.get(index)?.delete(key);
    if (errors.value.get(index)?.size === 0) {
      errors.value.delete(index);
    }
  } else {
    if (errors.value.get(index) === undefined) {
      errors.value.set(index, new Map());
    }
    errors.value.get(index)?.set(key, { message, input });
  }
};

const handleIsExpressionModeEnabled = (value: boolean) => {
  emit("user-config:expression-mode-change", value);
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
      <p class="text-gray-600 text-sm">
        If the math expression mode is enabled, you can type expressions like
        "-0.35*(cos(3.141*t/25)**100)+0.8". The "t" magic variable will be
        replaced by the currently rendered frame id at execution. See Deforum
        documentation for further information.
      </p>
    </div>

    <div v-show="errors.size > 0" class="rounded-md shadow">
      <ul class="flex flex-col">
        <li
          v-for="frame in errors.keys()"
          class="even:bg-red-100 odd:bg-red-50 p-2 flex flex-col space-y-2"
        >
          <div
            class="flex justify-between items-center"
            v-for="error in errors.get(frame)?.keys()"
          >
            <div class="text-red-500 text-sm flex space-x-2">
              <ExclamationTriangleIcon class="h-5 w-5" />
              <div>
                {{ errors.get(frame)?.get(error)?.message }}
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div class="text-xs text-red-500">#{{ frame }}:{{ error }}</div>
              <XButton
                @click="errors.get(frame)?.get(error)?.input.focus()"
                colors="bg-red-300 hover:bg-red-400 text-white"
              >
                Focus
              </XButton>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="flex flex-col space-y-4">
      <div
        class="flex space-x-2 sticky top-0 z-20 backdrop-blur-md py-4 -mx-4 shadow-md"
      >
        <div class="w-12"></div>
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
              Prompt that will be use for frame generation. [max 75 clip tokens]
            </ToolTip>
          </div>
          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold">Angle</span>
            <ToolTip position="right">
              Operator to rotate canvas clockwise/anticlockwise in degrees per
              frame [-360 - 360]
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
              Amount of graininess to add per frame for diffusion diversity [0 -
              1]
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2 row-span-2">
            <span class="uppercase font-bold"> Strength </span>
            <ToolTip position="left">
              Amount of presence of previous frame to influence next frame, also
              controls steps in the following formula [steps -
              (strength_schedule * steps)]. [min 0.0, max 1.0]
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
              Operator to tilt canvas up/down in degrees per frame [-360 - 360]
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold">3D Y</span>
            <ToolTip position="right">
              Operator to pan canvas left/right in degrees per frame [-360 -
              360]
            </ToolTip>
          </div>

          <div class="flex items-center space-x-2">
            <span class="uppercase font-bold">3D Z</span>
            <ToolTip position="right">
              Operator to roll canvas clockwise/anticlockwise [-360 - 360]
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
              :maxTokenCount="75"
              @update:modelValue="(newPrompt: string) => (handlePromptChange(newPrompt, index))"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'prompt')"
            ></XTextarea>

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              class="row-span-2"
              :modelValue="(frame as Frame).angle"
              :min="-360"
              :max="360"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'angle')"
              @update:modelValue="(newAngle: number) => (handleNumberChange(newAngle, index, 'angle'))"
            ></component>

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              class="row-span-2"
              :modelValue="(frame as Frame).zoom"
              :min="-10000"
              :max="10000"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'zoom')"
              @update:modelValue="(newZoom: number) => (handleNumberChange(newZoom, index, 'zoom'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).translation_x"
              :min="-10000"
              :max="10000"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'translation_x')"
              @update:modelValue="(newTranslationX: number) => (handleNumberChange(newTranslationX, index, 'translation_x'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).translation_y"
              :min="-10000"
              :max="10000"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'translation_y')"
              @update:modelValue="(newTranslationY: number) => (handleNumberChange(newTranslationY, index, 'translation_y'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).translation_z"
              :min="-10000"
              :max="10000"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'translation_z')"
              @update:modelValue="(newTranslationZ: number) => (handleNumberChange(newTranslationZ, index, 'translation_z'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              class=""
              :modelValue="(frame as Frame).noise_schedule"
              :min="0"
              :max="100"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'noise_schedule')"
              @update:modelValue="(newNoiseSchedule: number) => (handleNumberChange(newNoiseSchedule, index, 'noise_schedule'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              class=""
              :modelValue="(frame as Frame).strength_schedule"
              :min="0"
              :max="1"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'strength_schedule')"
              @update:modelValue="(newStrengthSchedule: number) => (handleNumberChange(newStrengthSchedule, index, 'strength_schedule'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              class=""
              :modelValue="(frame as Frame).contrast_schedule"
              :min="-10000"
              :max="10000"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'contrast_schedule')"
              @update:modelValue="(newContrastSchedule: number) => (handleNumberChange(newContrastSchedule, index, 'contrast_schedule'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).rotation_3d_x"
              :min="-360"
              :max="360"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'rotation_3d_x')"
              @update:modelValue="(newRotation3dX: number) => (handleNumberChange(newRotation3dX, index, 'rotation_3d_x'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).rotation_3d_y"
              :min="-360"
              :max="360"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'rotation_3d_y')"
              @update:modelValue="(newRotation3dY: number) => (handleNumberChange(newRotation3dY, index, 'rotation_3d_y'))"
            />

            <component
              :is="isExpressionModeEnabled ? XExpression : XNumber"
              :modelValue="(frame as Frame).rotation_3d_z"
              :min="-360"
              :max="360"
              :step="0.001"
              @error:change="(newError: string, input: HTMLInputElement) => handleErrorMessage(newError, input, index, 'rotation_3d_z')"
              @update:modelValue="(newRotation3dZ: number) => (handleNumberChange(newRotation3dZ, index, 'rotation_3d_z'))"
            />
            <div class="flex justify-end items-center col-span-3 space-x-4">
              <!-- add frame -->
              <XButton
                colors="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200"
                @click="handleAddFrameBetween(index)"
                title="Add a frame below this one"
              >
                Add frame
              </XButton>
              <XButton
                colors="bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-200"
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

    <div class="flex flex-col space-y-4 p-2 mt-5">
      <div class="flex justify-end items-center space-x-4 w-full">
        <XNumber
          class="flex-grow"
          :modelValue="stepIncrement"
          :min="1"
          :max="100"
          :step="1"
          :required="true"
          label="Steps increment"
          @update:modelValue="(newStepIncrement: number) => $emit('user-config:step-increment-change', newStepIncrement)"
        ></XNumber>
        <XButton @click="sortFramesById" title="Sort frames by ID"
          >Sort</XButton
        >
        <XButton
          @click="reorderFrames"
          title="Reindex frames using steps increment"
          >Reindex</XButton
        >
      </div>
      <XCheckbox
        :model-value="isExpressionModeEnabled"
        label="Math expressions mode"
        @update:model-value="handleIsExpressionModeEnabled"
      />
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
