import {
  SeedBehavior,
  Sampler,
  AnimationMode,
  PaddingMode,
  SamplingMode,
  Border,
} from "./enums";

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
  diffusion_cadence: number;
  border: Border;
  use_depth_warping: boolean;
  midas_weight: number;
  fov: number;
  padding_mode: PaddingMode;
  sampling_mode: SamplingMode;
  animation_mode: AnimationMode;
  resume_from_timestring: boolean;
  resume_timestring: string;
}

export interface FrameContract {
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
}
