import type { FrameContract } from "./interfaces";

export default class Frame implements FrameContract {
  id: number;
  prompt: string;
  angle: number;
  zoom: number;
  translation_x: number;
  translation_y: number;
  translation_z: number;
  rotation_3d_x: number;
  rotation_3d_y: number;
  rotation_3d_z: number;

  constructor() {
    this.id = 0;
    this.prompt = "";
    this.angle = 0;
    this.zoom = 0;
    this.translation_x = 0;
    this.translation_y = 0;
    this.translation_z = 0;
    this.rotation_3d_x = 0;
    this.rotation_3d_y = 0;
    this.rotation_3d_z = 0;
  }
}
