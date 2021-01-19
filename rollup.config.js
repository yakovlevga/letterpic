import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { uglify } from 'rollup-plugin-uglify';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
    output: [
      {
        file: 'dist/letterpic.js',
        format: 'iife',
        name: 'letterpic',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
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

  {
    input: 'src/lib-react/index.ts',
    output: [
      {
        file: 'dist/react/index.es.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'dist/react/index.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
    external: ['react'],
  },

  // {
  //   input: 'src/letterpic-react.ts',
  //   output: {
  //     file: 'dist/react/index.js',
  //     format: 'es',
  //     sourcemap: true,
  //   },
  //   plugins: [
  //     typescript({
  //       typescript: require('typescript'),
  //     }),
  //   ],
  // },
];
