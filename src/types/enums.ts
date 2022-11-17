export enum Sampler {
  Euler = "euler",
  Klms = "klms",
  Plms = "plms",
  Ddim = "ddim",
}

export enum SeedBehavior {
  Iter = "iter",
  Fixed = "fixed",
  Random = "random",
}

export const samplerList = [
  Sampler.Euler,
  Sampler.Klms,
  Sampler.Plms,
  Sampler.Ddim,
];

export const seedBehaviorList = [
  SeedBehavior.Iter,
  SeedBehavior.Fixed,
  SeedBehavior.Random,
];
