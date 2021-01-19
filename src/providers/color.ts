import {
  drawText,
  getPreparedCanvasContext,
  getRandomColorByString,
} from 'helpers';
import type { LetterPicProvider, LetterPicSettings } from 'types/core';

export const color: LetterPicProvider = (
  text: string,
  key: string,
  settings: LetterPicSettings
) => {
  const context = getPreparedCanvasContext(settings);
  context.fillStyle = getRandomColorByString(key);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  drawText(context, settings, text);
  return context.canvas;
};
