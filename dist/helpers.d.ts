import { LetterPickFontSettings, LetterPicSettings } from 'types/core';
export declare const drawText: (context: CanvasRenderingContext2D, settings: LetterPickFontSettings, text: string) => void;
export declare const getPreparedCanvasContext: (settings: LetterPicSettings) => CanvasRenderingContext2D;
export declare const getInitials: (text: string) => string;
export declare const getItemByString: <T>(s: string, arr: T[]) => T;
export declare const getRandomColorByString: (s: string) => string;
export declare const getDefinedColorByString: (settings: LetterPicSettings, s: string) => string;
