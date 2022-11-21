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
  Border = "Border",
  Reflection = "Reflection",
  Zero = "Zero",
}

export enum SamplingMode {
  Bicubic = "Bicubic",
  Bilinear = "Bilinear",
  Nearest = "Nearest",
}

export enum Border {
  Warp = "Warp",
  Replicate = "Replicate",
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
