import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

let production = (process.env.NODE_ENV == "production");

let plugins = [ babel() ];

if (production) {
	plugins.push(uglify());
}

export default {
	input: "src/index.js",
	plugins: plugins,
	output: {
		file: production ? "dist/umd/jstn-js.min.js" : "dist/umd/jstn-js.js",
		format: "umd",
		name: "jstn",
		sourcemap: true
	}
}