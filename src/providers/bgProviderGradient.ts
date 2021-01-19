import {
  drawText,
  getColorByString,
  getItemByString,
  getOrSetBackground,
  getPreparedCanvasContext,
} from 'providers/helpers';
import type {
  LetterPicGradient,
  LetterPicProvider,
  LetterPicSettings,
} from 'types/core';

const getLinearGradient = (
  context: CanvasRenderingContext2D,
  colors: LetterPicGradient
): CanvasGradient => {
  const gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
  gradient.addColorStop(0, colors[0]);
  var gradientStep = 1 / (colors.length - 1);
  for (var i = 1; i < colors.length - 1; i++) {
    gradient.addColorStop(i * gradientStep, colors[i]);
  }
  gradient.addColorStop(1, colors[colors.length - 1]);
  return gradient;
};

const reverseString = (s: string) => s.split('').reverse().join('');

export const bgProviderGradient: LetterPicProvider = (
  settings: LetterPicSettings
) => {
  const context = getPreparedCanvasContext(settings);

  const draw = (text: string, cacheKey: string) => {
    context.fillStyle = getOrSetBackground(cacheKey, () => {
      if (settings.gradients !== undefined && settings.gradients.length > 0) {
        const gradient = getItemByString(cacheKey, settings.gradients);
        return getLinearGradient(context, gradient);
      }

      const startColor = getColorByString(settings, cacheKey);
      const endColor = getColorByString(settings, reverseString(cacheKey));

      return getLinearGradient(context, [startColor, endColor]);
    });

    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    drawText(context, settings, text);
    return context.canvas;
  };

  return {
    draw,
  };
};
