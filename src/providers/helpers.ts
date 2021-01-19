import { LetterPickFontSettings, LetterPicSettings } from 'types/core';

const CANVAS_CONTEXT_SCALE = window.devicePixelRatio;

const defaultColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
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

const hashCode = (s: string): number => {
  var hash = 0,
    i,
    chr;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

export const getItemByString = <T>(s: string, arr: T[]): T => {
  const idx = Math.abs(hashCode(s)) % arr.length;
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
