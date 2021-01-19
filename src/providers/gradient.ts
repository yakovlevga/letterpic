import {
  drawText,
  getDefinedColorByString,
  getItemByString,
  getRandomColorByString,
} from 'helpers';
import type { LetterPicGradient, LetterPicProvider } from 'types/core';

const getLinearGradient = (
  context: CanvasRenderingContext2D,
  colors: LetterPicGradient
): CanvasGradient => {
  const gradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
  var gradientStep = 1 / (colors.length - 1);
  for (var i = 0; i < colors.length; i++) {
    gradient.addColorStop(i * gradientStep, colors[i]);
  }
  return gradient;
};

// const reverseString = (s: string) => s.split('').reverse().join('');

export const gradient: LetterPicProvider = (text, key, settings, context) => {
  let gradient: LetterPicGradient;
  if (settings.gradients !== undefined && settings.gradients.length > 0) {
    gradient = getItemByString(key, settings.gradients);
  } else {
    const startColor = getDefinedColorByString(settings, key);
    const endColor = getRandomColorByString(key); // getDefinedColorByString(settings, reverseString(key));
    gradient = [startColor, endColor];
  }

  context.fillStyle = getLinearGradient(context, gradient);
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  drawText(context, settings, text);
  return context.canvas;
};
