type LetterPicColor = string;
type LetterPicGradient = LetterPicColor[];

export type LetterPicFillType = 'palette' | 'gradient' | 'color';

export type LetterPickFontSettings = {
  font: string;
  fontColor: string;
  fontStrokeColor: string;
  fontSize: number;
};

export type LetterPicSettings = LetterPickFontSettings & {
  fill: LetterPicFillType;
  size: number;
  colors?: LetterPicColor[];
  gradients?: LetterPicGradient[];
  maxInitialsLength: 2;
};

export type LetterPicProvider = (
  initials: string,
  cacheKey: string,
  settings: LetterPicSettings
) => HTMLCanvasElement;
