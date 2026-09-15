import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import globals from "globals";

export default [
	{
		ignores: [
			".cache",
			"dist",
			"test/fixtures/sample.js"
		]
	},
	js.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: {
				...globals.node
			},
			ecmaVersion: "latest",
	// 	parser: "@babel/eslint-parser",
	//  parserOptions: {
	// 	requireConfigFile: false,
	// 	ecmaVersion: 2017,
	// 	sourceType: "module",
		},
	},
];
