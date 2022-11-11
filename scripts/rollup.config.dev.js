import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy'
import { babel } from '@rollup/plugin-babel';

export default {
    input: "src/index.ts",
    output: {
      file: "dist/bundle.js",
      format: "umd",
    },
    plugins: [
        babel({
            exclude: "**/node_modules/**",
            babelHelpers: 'runtime',
        }),
        resolve(),
        typescript(),
        copy({
            targets: [
              { src: 'src/index.html', dest: 'dist' },
              { src: 'test/assets', dest: 'dist' }
            ],
        }),
        serve({
            port: 8080,
            contentBase: 'dist',
        }),
    ],
    sourcemap: true,
};