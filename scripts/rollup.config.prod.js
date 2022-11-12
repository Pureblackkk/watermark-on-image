import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
import dts from "rollup-plugin-dts";
import { babel } from '@rollup/plugin-babel';

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "umd",
                name: 'watermark-on-image',
            },
            {
                file: `dist/index.cjs.js`,
                format: 'cjs',
                name: 'watermark-on-image',
            },
            {
                file: `dist/index.esm.js`,
                format: 'es',
                name: 'watermark-on-image',
            }
        ],
        plugins: [
            resolve(),
            typescript(),
            babel({
                exclude: "**/node_modules/**",
                babelHelpers: 'runtime',
            }),
            filesize(),
        ],
    },
    {
        input: "src/index.d.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "es",
                name: 'watermark-on-image',
            },
        ],
        plugins: [
            dts(),
        ],
    }
];