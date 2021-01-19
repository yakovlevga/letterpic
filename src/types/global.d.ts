import type { LetterPicCache as LetterPicCacheShape } from 'types/core';

declare global {
  interface Window {
    LetterPicCache: LetterPicCacheShape;
  }
}
