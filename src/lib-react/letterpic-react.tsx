import React from 'react';

import { draw } from '../letterpic-browser';

export const LetterPic: React.FC = () => {
  const img = draw('My Name', undefined, 'asdasdasd').asDataString();
  return <img src={img} />;
};
