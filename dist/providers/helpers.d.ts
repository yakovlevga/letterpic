import { LetterPickFontSettings, LetterPicSettings } from 'types/core';
export declare const drawText: (context: CanvasRenderingContext2D, settings: LetterPickFontSettings, text: string) => void;
export declare const getCanvasContextScaled: (htmlCanvas: HTMLCanvasElement) => CanvasRenderingContext2D;
export declare const scaleCanvasContext: (htmlCanvas: HTMLCanvasElement) => void;
export declare const getPreparedCanvasContext: (settings: LetterPicSettings) => CanvasRenderingContext2D;
export declare const getInitials: (text: string) => string;
export declare const getItemByString: <T>(s: string, arr: T[]) => T;
export declare const getColorByString: (settings: LetterPicSettings, s: string) => string;
export declare const getOrSetBackground: (cacheKey: string, getBackground: () => CanvasRenderingContext2D['fillStyle']) => CanvasRenderingContext2D['fillStyle'];
