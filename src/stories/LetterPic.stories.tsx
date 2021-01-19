import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { LetterPic } from '../../dist/react-lib/LetterPic';

export default {
  title: 'LetterPic React/LetterPic Component',
  component: LetterPic,
  argTypes: {
    fill: {
      name: 'Fill style',
      description: 'The way how background will draw',
      defaultValue: 'palette',
      control: {
        type: 'select',
        options: ['palette', 'gradient', 'color'],
      },
    },
  },
} as Meta;

const Template: Story<Parameters<typeof LetterPic>[0]> = ({
  name,
  ...args
}) => <LetterPic name={name} fill={args.fill} />;

export const FillColor = Template.bind({});
FillColor.args = {
  name: 'Jhon Doe',
  fill: 'palette',
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
