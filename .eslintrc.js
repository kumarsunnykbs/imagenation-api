module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
	},
	'extends': [
		'google',
	],
	'parserOptions': {
		'ecmaVersion': 12,
	},
	'rules': {
		'valid-jsdoc': 0,
		'max-len': 0,
		'new-cap': 0,
		'indent': [2, 'tab'],
		'no-tabs': 0,
		'require-jsdoc': 0,
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
	},
};
