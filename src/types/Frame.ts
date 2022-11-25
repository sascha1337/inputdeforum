import type { FrameContract } from "./interfaces";

export default class Frame implements FrameContract {
  id: number;
  prompt: string | undefined;
  angle: string | undefined;
  zoom: string | undefined;
  translation_x: string | undefined;
  translation_y: string | undefined;
  translation_z: string | undefined;
  rotation_3d_x: string | undefined;
  rotation_3d_y: string | undefined;
  rotation_3d_z: string | undefined;
  noise_schedule: string | undefined;
  strength_schedule: string | undefined;
  contrast_schedule: string | undefined;

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
