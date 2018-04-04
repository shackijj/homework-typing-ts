module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json',
			enableTsDiagnostics: true
		}
	},
	moduleFileExtensions: [
		'ts',
		'js'
	],
	transform: {
		'^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
	},
	testMatch: [
		'**/test/**/*.test.(ts|js)'
	],
	testEnvironment: 'node'
};