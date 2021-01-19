import { drawText, getDefinedColorByString } from 'helpers';
import type { LetterPicProvider } from 'types/core';

export const palette: LetterPicProvider = (text, key, settings, context) => {
  context.fillStyle = getDefinedColorByString(settings, key);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  drawText(context, settings, text);
  return context.canvas;
};
