import { Swatch } from "./swatch.model";

export interface Palette {
  DarkMuted: Swatch;
  DarkVibrant: Swatch;
  LightMuted: Swatch;
  LightVibrant: Swatch;
  Muted: Swatch;
  Vibrant: Swatch;
}

export enum PaletteColor {
  darkMuted,
  darkVibrant,
  lightMuted,
  lightVibrant,
  muted,
  vibrant,
}
