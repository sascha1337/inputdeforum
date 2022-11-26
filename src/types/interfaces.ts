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
}
