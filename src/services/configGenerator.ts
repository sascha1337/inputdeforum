import Frame from "../types/Frame";
import { GlobalConfig } from "../types/interfaces";

export async function generateConfig(config: GlobalConfig): Promise<string> {
  const configJson = await import("./base-config.json");

  let newConfig = {};
  Object.assign(newConfig, configJson);
  delete (newConfig as any).default;

  replaceValues(newConfig, config);
  compileAnimationPrompts(newConfig, config.frames);
  compileFrameStrings(newConfig, config.frames);

  return JSON.stringify(newConfig, null, "  ");
}

function replaceValues(
  configJson: { [key: string]: any },
  config: GlobalConfig
): void {
  configJson.batch_name = config.batch_name;
  configJson.width = config.width;
  configJson.height = config.height;
  configJson.seed = config.seed;
  configJson.seed_behavior = config.seed_behavior;
  configJson.sampler = config.sampler;
  configJson.steps = config.steps;
  configJson.scale = config.scale;
  configJson.ddim_eta = config.ddim_eta;
}

function compileAnimationPrompts(
  configJson: { [key: string]: any },
  frames: Frame[]
): void {
  const prompts: { [key: string]: string } = {};
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const prompt = frame.prompt;
    const id = frame.id;
    if (prompt !== undefined && prompt !== "") {
      prompts[id] = prompt;
    }
  }

  configJson.animation_prompts = prompts;
}

function compileFrameStrings(
  configJson: { [key: string]: any },
  frames: Frame[]
): void {
  const frameStrings = {
    angle: "",
    zoom: "",
    translation_x: "",
    translation_y: "",
    translation_z: "",
    rotation_3d_x: "",
    rotation_3d_y: "",
    rotation_3d_z: "",
  };

  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i] as any;
    const id = frame.id;

    for (const key in frameStrings) {
      if (Object.prototype.hasOwnProperty.call(frameStrings, key)) {
        if (frame[key] !== undefined && frame[key] !== "") {
          (frameStrings as any)[key] += `${id}:(${frame[key]}), `;
        }
      }
    }
  }

  for (const key in frameStrings) {
    if (Object.prototype.hasOwnProperty.call(frameStrings, key)) {
      let element = (frameStrings as any)[key];
      if (element.endsWith(", ")) {
        element = element.slice(0, -2);
      }
      if (element === "") {
        element = "0:(0)";
      }
      configJson[key] = element;
    }
  }
}
