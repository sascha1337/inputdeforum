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
