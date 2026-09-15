import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
import filesize from "./src/index.js";

import pkg from "./package.json" with {type: "json"};

const reporters = ["boxen"];

export default [
	{
		external: ["node:path", "node:url", "node:fs/promises", ...Object.keys(pkg.dependencies)],
		plugins: [
			json(),
			babel({
				babelrc: false,
				babelHelpers: "runtime",
				plugins: [
					"@babel/plugin-transform-runtime",
					"@babel/plugin-syntax-import-assertions"
				],
				presets: [["@babel/preset-env", { targets: { node: 10 } }]],
			}),
			filesize({
				showBeforeSizes: "release",
			}),
		],
		input: "src/index.js",
		output: {
			exports: "default",
			sourcemap: true,
			file: `dist/index.js`,
			format: "cjs",
		},
	},
	...reporters.map((reporter) => {
		return {
			external: ["boxen", "colors/safe.js", "@babel/runtime"],
			plugins: [
				babel({
					babelrc: false,
					babelHelpers: "runtime",
					plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-syntax-import-assertions"],
					presets: [["@babel/preset-env", { targets: { node: 10 } }]],
				}),
				filesize({
					showBeforeSizes: "release",
				}),
			],
			input: `src/reporters/${reporter}`,
			output: {
				exports: "named",
				sourcemap: true,
				file: `dist/reporters/${reporter}.js`,
				format: "cjs",
			},
		};
	}),
];
