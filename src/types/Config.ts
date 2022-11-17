import { Sampler, SeedBehavior } from "./enums";
import { GlobalConfig } from "./interfaces";

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
  }
}
