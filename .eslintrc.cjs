module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ["xo", "plugin:vue/vue3-essential", "plugin:prettier/recommended"],
	overrides: [
		{
			env: {
				node: true
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script"
			}
		}
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["vue"],
	rules: {}
};
