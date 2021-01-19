import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const input = 'src/letterpic.ts';

const plugins = [
  typescript({
    typescript: require('typescript'),
  }),
];

const config = {
  input,
  output: {
    sourcemap: true,
  },
  plugins,
};

export default [
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.module,
      format: 'esm',
    },
  },
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.module,
      format: 'cjs',
    },
  },
  {
    ...config,
    output: {
      ...config.output,
      file: 'dist/letterpic.js',
      format: 'iife',
      name: 'LetterPic',
    },
  },
];
