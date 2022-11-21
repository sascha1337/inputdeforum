import {
  AnimationMode,
  Border,
  PaddingMode,
  Sampler,
  SamplingMode,
  SeedBehavior,
} from "./enums";
import Frame from "./Frame";
import { FrameContract, GlobalConfig } from "./interfaces";

export default class Config implements GlobalConfig {
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

  constructor() {
    this.batch_name = "default";
    this.width = 512;
    this.height = 512;
    this.seed = -1;
    this.seed_behavior = SeedBehavior.Iter;
    this.sampler = Sampler.Euler;
    this.steps = 100;
    this.scale = 8;
    this.ddim_eta = 0;
    this.frames = [new Frame()];
    this.diffusion_cadence = 1;
    this.border = Border.Warp;
    this.use_depth_warping = true;
    this.midas_weight = 0.3;
    this.fov = 90;
    this.padding_mode = PaddingMode.Border;
    this.sampling_mode = SamplingMode.Bicubic;
    this.animation_mode = AnimationMode.ThreeD;
    this.resume_from_timestring = false;
    this.resume_timestring = "";
  }
}
