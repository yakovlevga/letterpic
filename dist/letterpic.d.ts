import { LetterPicSettings } from 'types/core';
export declare const letterpic: (userSettings?: Partial<LetterPicSettings> | undefined) => {
    asDataString: (text: string) => string;
    asImage: (text: string) => HTMLImageElement;
};
