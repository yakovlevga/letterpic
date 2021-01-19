import { LetterPicSettings } from 'types/core';

export const LETTER_PIC_DEFAULTS: LetterPicSettings = {
  fill: 'gradient',
  size: 100,
  font: 'Arial',
  fontColor: '#fff',
  fontStrokeColor: '#000',
  fontSize: 0.45,
  imageOverlayColor: 'rgba(0, 0, 0, 0)',
  maxInitialsLength: 2,
  // if it's true, it uses global cache for different calls
  useGlobalCache: true,
  // set default images
  images: [],
};

const defaultImgPath = 'patterns';
const defaultImgCount = 8;
const defaultImgExt = '.png';
for (let i = 1; i <= defaultImgCount; i++) {
  LETTER_PIC_DEFAULTS.images.push(defaultImgPath + '/' + i + defaultImgExt);
}
