import {
  drawText,
  getColorByString,
  getOrSetBackground,
  getPreparedCanvasContext,
} from 'providers/helpers';
import { LetterPicProvider, LetterPicSettings } from 'types/core';

export const bgProviderColor: LetterPicProvider = (
  settings: LetterPicSettings
) => {
  const context = getPreparedCanvasContext(settings);

  const draw = (text: string, cacheKey: string) => {
    context.fillStyle = getOrSetBackground(cacheKey, () =>
      getColorByString(settings, cacheKey)
    );
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawText(context, settings, text);
    return context.canvas;
  };

  return { draw };
};
