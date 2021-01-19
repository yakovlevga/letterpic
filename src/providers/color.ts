import { drawText, getRandomColorByString } from 'helpers';
import type { LetterPicProvider } from 'types/core';

export const color: LetterPicProvider = (text, key, settings, context) => {
  context.fillStyle = getRandomColorByString(key);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  drawText(context, settings, text);
  return context.canvas;
};
