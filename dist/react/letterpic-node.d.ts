import { LetterPicSettings } from 'types/core';
export declare const draw: (name: string, userSettings?: Partial<LetterPicSettings> | undefined, key?: string) => {
    asCanvas: () => HTMLCanvasElement;
    asDataUrl: (mimeType?: "image/jpeg" | "image/png" | undefined, quality?: number | undefined) => string;
};
