import React, { useEffect, useState } from 'react';

import { draw } from 'letterpic-browser';
import type { LetterPicSettings } from 'types/core';

export const LetterPic: React.FC<
  { name: string; key?: string } & Partial<LetterPicSettings>
> = ({ name, key, ...props }) => {
  const src = draw(name, props, key).asDataString();
  return <img src={src} />;
};
