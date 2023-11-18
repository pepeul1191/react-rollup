import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH;

const Demo = {
   input: 'src/entries/index.js',
   output: {
      file: production ? 'public/dist/demo.min.js' : 'public/dist/demo.js',
      format: 'iife'
   },
   plugins: [
      nodeResolve({
         extensions: ['.js', '.jsx']
      }),
      babel({
         babelHelpers: 'bundled',
         presets: ['@babel/preset-react'],
         extensions: ['.js', '.jsx']
      }),
      terser(),
      commonjs(),
      css({ 
         output: production ?  'demo.min.css' : 'demo.css'
      }),
      replace({
         preventAssignment: false,
         'process.env.NODE_ENV': '"development"'
      })
   ],
   onwarn: function (warning) {
     if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
     //console.warn(warning.message);
   }
}

export default [Demo, ];