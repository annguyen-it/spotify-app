import { Injectable } from '@angular/core';
import { PaletteColor } from '@models/vibrant/palette.model';
import { Swatch } from '@models/vibrant/swatch.model';
import Vibrant from 'node-vibrant';

@Injectable({ providedIn: 'root' })
export class VibrantService {
  constructor() { }

  static async generateColor(imageUrl: string, color: PaletteColor = PaletteColor.darkMuted): Promise<string> {
    const palette = await Vibrant.from(imageUrl)
      .quality(5)
      .getPalette();

    let pal: Swatch;

    switch (color) {
      case PaletteColor.darkMuted:
        pal = (palette.DarkMuted! as any) as Swatch;
        break;
      case PaletteColor.darkVibrant:
        pal = (palette.DarkVibrant! as any) as Swatch;
        break;
      case PaletteColor.lightMuted:
        pal = (palette.LightMuted! as any) as Swatch;
        break;
      case PaletteColor.lightVibrant:
        pal = (palette.LightVibrant! as any) as Swatch;
        break;
      case PaletteColor.muted:
        pal = (palette.Muted! as any) as Swatch;
        break;
      case PaletteColor.vibrant:
        pal = (palette.Vibrant! as any) as Swatch;
        break;
    }

    return (`rgb(${pal._rgb.join(',')})`);
  }
}
