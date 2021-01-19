import {
  drawText,
  getDefinedColorByString,
  getPreparedCanvasContext,
} from 'helpers';
import type { LetterPicProvider, LetterPicSettings } from 'types/core';

export const palette: LetterPicProvider = (
  text: string,
  key: string,
  settings: LetterPicSettings
) => {
  const context = getPreparedCanvasContext(settings);
  context.fillStyle = getDefinedColorByString(settings, key);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  drawText(context, settings, text);
  return context.canvas;
};
