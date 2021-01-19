import {
  LetterPicProvider,
  LetterPicFillType,
  LetterPicSettings,
} from 'types/core';
import { LETTER_PIC_DEFAULTS } from './defaultSettings';
import { palette } from './providers/palette';
import { gradient } from './providers/gradient';
import { color } from './providers/color';
import { getInitials } from './helpers';

const PROVIDERS: Record<LetterPicFillType, LetterPicProvider> = {
  palette,
  gradient,
  color,
};

const cache: Partial<Record<string, string>> = {};

const getPreparedCanvasContext = (
  settings: LetterPicSettings
): CanvasRenderingContext2D => {
  const canvas = document.createElement('canvas');
  canvas.width = settings.size;
  canvas.height = settings.size;
  return canvas.getContext('2d')!;
};

export const draw = (
  name: string,
  userSettings?: Partial<LetterPicSettings>,
  key: string = name
) => {
  const settingsWithDefaults: LetterPicSettings = {
    ...LETTER_PIC_DEFAULTS,
    ...userSettings,
  };

  const provider = PROVIDERS[settingsWithDefaults.fill];

  const asCanvas = () => {
    const initials = getInitials(name);
    const context = getPreparedCanvasContext(settingsWithDefaults);
    return provider(initials, key, settingsWithDefaults, context);
  };

  const asDataURL: HTMLCanvasElement['toDataURL'] = (type, quality) => {
    if (cache[key] === undefined) {
      cache[key] = asCanvas().toDataURL(type, quality);
    }
    return cache[key]!;
  };

  const asImage = () => {
    const img = document.createElement('img');
    img.src = asDataURL();
    return img;
  };

  const insureImg = (img: HTMLImageElement) => {
    const imgErrorHandler = () => {
      img.removeEventListener('error', imgErrorHandler);
      img.src = asDataURL();
    };

    const imgLoadHandler = () => {
      img.removeEventListener('error', imgErrorHandler);
      img.removeEventListener('load', imgLoadHandler);
    };

    img.addEventListener('error', imgErrorHandler);
    img.addEventListener('load', imgLoadHandler);
  };

  return { asDataString: asDataURL, asImage, asCanvas, insureImg };
};
