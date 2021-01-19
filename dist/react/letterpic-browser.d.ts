import { LetterPicSettings } from 'types/core';
export declare const draw: (name: string, userSettings?: Partial<LetterPicSettings> | undefined, key?: string) => {
    asDataString: (type?: string | undefined, quality?: any) => string;
    asImage: () => HTMLImageElement;
    asCanvas: () => HTMLCanvasElement;
    insureImg: (img: HTMLImageElement) => void;
};
