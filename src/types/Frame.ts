import type { FrameContract } from "./interfaces";

export default class Frame implements FrameContract {
  id: number;
  prompt: string | undefined;
  angle: number | undefined;
  zoom: string | undefined;
  translation_x: number | undefined;
  translation_y: number | undefined;
  translation_z: number | undefined;
  rotation_3d_x: number | undefined;
  rotation_3d_y: number | undefined;
  rotation_3d_z: number | undefined;
  noise_schedule: number | undefined;
  strength_schedule: number | undefined;
  contrast_schedule: number | undefined;

  constructor(id: number = 0) {
    this.id = id;
    this.prompt = undefined;
    this.angle = undefined;
    this.zoom = undefined;
    this.translation_x = undefined;
    this.translation_y = undefined;
    this.translation_z = undefined;
    this.rotation_3d_x = undefined;
    this.rotation_3d_y = undefined;
    this.rotation_3d_z = undefined;
    this.noise_schedule = undefined;
    this.strength_schedule = undefined;
    this.contrast_schedule = undefined;
  }
}
