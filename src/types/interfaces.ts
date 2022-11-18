import { SeedBehavior, Sampler } from "./enums";

export interface GlobalConfig {
  batch_name: string;
  width: number;
  height: number;
  seed: number;
  seed_behavior: SeedBehavior;
  sampler: Sampler;
  steps: number;
  scale: number;
  ddim_eta: number;
}

export interface FrameContract {
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
}
