type LetterPicColor = string;
type LetterPicGradient = LetterPicColor[];

export type LetterPicFillType = 'color' | 'gradient' | 'image';

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

  imageOverlayColor: string;
  maxInitialsLength: 2;
  // if it's true, it uses global cache for different calls
  useGlobalCache: boolean;
  // set default images
  images: string[];
};

export type LetterPicCache = {
  backgrounds: Partial<Record<string, CanvasFillStrokeStyles['fillStyle']>>;
};

export type LetterPicProvider = (
  settings: LetterPicSettings
) => {
  draw: (initials: string, cacheKey: string) => HTMLCanvasElement;
};
