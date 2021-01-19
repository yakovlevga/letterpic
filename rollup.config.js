import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { uglify } from 'rollup-plugin-uglify';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const input = 'src/letterpic.ts';

export default [
  {
    input: 'src/letterpic-node.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
        compilerOptions: {
          target: 'es6',
        },
      }),
      nodeResolve(),
      commonjs(),
    ],
    external: ['canvas'],
  },
  {
    input: 'src/letterpic-browser.ts',
    output: {
      file: 'dist/letterpic.js',
      format: 'iife',
      name: 'letterpic',
      sourcemap: true,
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      uglify(),
    ],
  },
  {
    input: 'src/letterpic-browser.ts',
    output: {
      file: 'dist/letterpic.min.js',
      format: 'iife',
      name: 'letterpic',
      sourcemap: false,
    },
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      uglify(),
    ],
  },
];
