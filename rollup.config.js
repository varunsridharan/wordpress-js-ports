import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';

export default {
	input: './src/index.js',
	output: [
		{
			file: './dist/wordpress-js-ports.js',
			format: 'iife',
		},
		{
			file: './dist/wordpress-js-ports.min.js',
			format: 'iife',
			plugins: [
				uglify( { mangle: true } ),
			]
		}
	],
	plugins: [
		resolve( { jsnext: true } ),
		commonjs(),
		babel( {
			exclude: 'node_modules/**'
		} ),
		filesize(),
		visualizer()
	]
};
