import { LetterPickFontSettings, LetterPicSettings } from 'types/core';
import { Md5 } from 'ts-md5/src/md5';

const CANVAS_CONTEXT_SCALE = window.devicePixelRatio;

const defaultColors = [
  '#f44336',
  '#673ab7',
  '#03a9f4',
  '#4caf50',
  '#ffeb3b',
  '#ff5722',
  '#607d8b',
  '#e91e63',
  '#3f51b5',
  '#00bcd4',
  '#8bc34a',
  '#ffc107',
  '#795548',
  '#2196f3',
  '#009688',
  '#cddc39',
  '#ff9800',
  '#9e9e9e',
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
];

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
    context.shadowColor = 'black';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 3;
  }

  context.fillStyle = settings.fontColor;
  context.fillText(text, posX, posY);
};

export const getCanvasContextScaled = (
  htmlCanvas: HTMLCanvasElement
): CanvasRenderingContext2D => {
  var context = htmlCanvas.getContext('2d')!;
  var scale = CANVAS_CONTEXT_SCALE;
  context.scale(scale, scale);
  return context;
};

export const scaleCanvasContext = (htmlCanvas: HTMLCanvasElement) => {
  var scale = CANVAS_CONTEXT_SCALE;
  htmlCanvas.width = scale * htmlCanvas.width;
  htmlCanvas.height = scale * htmlCanvas.height;
};

export const getPreparedCanvasContext = (
  settings: LetterPicSettings
): CanvasRenderingContext2D => {
  const canvas = document.createElement('canvas');
  canvas.width = settings.size;
  canvas.height = settings.size;
  scaleCanvasContext(canvas);
  return getCanvasContextScaled(canvas);
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
  Md5.hashStr(s, true)![0] as number;

export const getItemByString = <T>(s: string, arr: T[]): T => {
  const idx = Math.abs(stringToInteger(s)) % arr.length;
  return arr[idx];
};

export const getColorByString = (settings: LetterPicSettings, s: string) => {
  const colors = settings.colors || defaultColors;
  return getItemByString(s, colors);
};

export const getOrSetBackground = (
  cacheKey: string,
  getBackground: () => CanvasRenderingContext2D['fillStyle']
): CanvasRenderingContext2D['fillStyle'] => {
  const { backgrounds } = window.LetterPicCache;
  if (backgrounds[cacheKey] === undefined) {
    backgrounds[cacheKey] = getBackground();
  }
  return window.LetterPicCache.backgrounds[cacheKey]!;
};

// export const getBackground = (fill: LetterPicFillType, text: string) => {
//   var bg;
//   if (!self.cache[fill]) {
//     self.cache[fill] = {};
//   }
//   if (!self.cache[fill][key]) {
//     if (bgs.length === 0) bgs = provider.bgs.slice().reverse();
//     bg = bgs.pop();
//     self.cache[fill][key] = bg;
//   } else {
//     bg = self.cache[fill][key];
//   }
//   return bg;
// };
