import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only';

export default {
   input: 'src/index.js',
   output: {
      file: 'public/dist/bundle.js',
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
      commonjs(),
      css({ output: 'styles.css' }),
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