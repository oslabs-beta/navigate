import json from '@rollup/plugin-json';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

export default {
  input: '/index.js',
  output: {
    dir: 'output',
    format: 'iife'
  },
  plugins: [json({
    compat: true
  })]
};