module.exports = {
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		jquery: true
	},
	extends: 'eslint:recommended',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		quotes: [
			'error',
			'single'
		]
	}
};
