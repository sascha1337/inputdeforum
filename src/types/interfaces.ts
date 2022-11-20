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
  frames: FrameContract[];
  isAutoSaveEnabled: boolean;
}

export interface FrameContract {
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
  noise_schedule: number | undefined;
  strength_schedule: number | undefined;
  contrast_schedule: number | undefined;
}
