import { LetterPicSettings } from 'types/core';
export declare const draw: (name: string, userSettings?: Partial<LetterPicSettings> | undefined, key?: string) => {
    asBase64: () => string;
};
