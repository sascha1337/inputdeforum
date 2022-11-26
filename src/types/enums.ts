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

export enum AnimationMode {
  ThreeD = "3D",
}

export enum PaddingMode {
  Border = "border",
  Reflection = "reflection",
  Zero = "zero",
}

export enum SamplingMode {
  Bicubic = "bicubic",
  Bilinear = "bilinear",
  Nearest = "nearest",
}

export enum Border {
  Warp = "warp",
  Replicate = "replicate",
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

export const animationModeList = [AnimationMode.ThreeD];

export const paddingModeList = [
  PaddingMode.Border,
  PaddingMode.Reflection,
  PaddingMode.Zero,
];

export const samplingModeList = [
  SamplingMode.Bicubic,
  SamplingMode.Bilinear,
  SamplingMode.Nearest,
];

export const borderList = [Border.Warp, Border.Replicate];
