import { defaultColors } from 'defaults';
import { md5hash } from 'md5';
import { LetterPickFontSettings, LetterPicSettings } from 'types/core';

export const drawText = (
  context: CanvasRenderingContext2D,
  settings: LetterPickFontSettings,
  text: string
) => {
  const { width, height } = context.canvas;
  var fontSize = width * settings.fontSize;
  context.font = `${fontSize}px ${settings.font}`;
  context.textAlign = 'center';

  var posX = width / 2;
  var posY = (fontSize + height) * 0.45;

  if (settings.fontStrokeColor) {
    context.shadowColor = settings.fontStrokeColor;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 3;
  }

  context.fillStyle = settings.fontColor;
  context.fillText(text, posX, posY);
};

export const getPreparedCanvasContext = (
  settings: LetterPicSettings
): CanvasRenderingContext2D => {
  const canvas = document.createElement('canvas');
  canvas.width = settings.size;
  canvas.height = settings.size;
  return canvas.getContext('2d')!;
};

export const getInitials = (text: string) => {
  var splitted = text.split(' ');
  var result = splitted[0].charAt(0).toUpperCase();
  for (var i = 1; i < 2; i++) {
    if (splitted.length > i) {
      result += splitted[i].charAt(0).toUpperCase();
    }
  }

  return result;
};

const stringToInteger = (s: string): number =>
  parseInt(md5hash(s).substring(0, 8), 16);

export const getItemByString = <T>(s: string, arr: T[]): T => {
  const idx = Math.abs(stringToInteger(s)) % arr.length;
  return arr[idx];
};

export const getRandomColorByString = (s: string) =>
  `#${md5hash(s).substring(0, 6)}`;

export const getDefinedColorByString = (
  settings: LetterPicSettings,
  s: string
) => {
  const colors = settings.colors || defaultColors;
  return getItemByString(s, colors);
};
