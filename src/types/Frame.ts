import type { FrameContract } from "./interfaces";

export default class Frame implements FrameContract {
  id: number;
  prompt: string | undefined;
  angle: number | undefined;
  zoom: number | undefined;
  translation_x: number | undefined;
  translation_y: number | undefined;
  translation_z: number | undefined;
  rotation_3d_x: number | undefined;
  rotation_3d_y: number | undefined;
  rotation_3d_z: number | undefined;

  constructor() {
    this.id = 0;
    this.prompt = undefined;
    this.angle = undefined;
    this.zoom = undefined;
    this.translation_x = undefined;
    this.translation_y = undefined;
    this.translation_z = undefined;
    this.rotation_3d_x = undefined;
    this.rotation_3d_y = undefined;
    this.rotation_3d_z = undefined;
  }
}
