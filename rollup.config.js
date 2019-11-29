// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'js/index.js',
    plugins: [
        resolve(),
    ],
    output: {
        file: 'js/bundle.js',
        format: 'umd',
        name: 'fa-custom-icon'
    }
};
