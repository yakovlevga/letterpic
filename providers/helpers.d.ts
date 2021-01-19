import { LetterPickFontSettings } from 'types/core';
export declare const drawText: (context: CanvasRenderingContext2D, settings: LetterPickFontSettings, text: string) => void;
export declare const getCanvasContextScaled: (htmlCanvas: HTMLCanvasElement) => CanvasRenderingContext2D;
export declare const scaleCanvasContext: (htmlCanvas: HTMLCanvasElement) => void;
export declare const prepareCanvasContext: (htmlCanvas: HTMLCanvasElement) => CanvasRenderingContext2D;
