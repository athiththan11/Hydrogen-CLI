const { expect, test } = require('@oclif/test');
const { describe } = require('mocha');

describe('distribute apim', () => {
	let desc = 'Configure WSO2 API Manager products for distributed deployments with supported config models';

	test.stdout()
		.command(['distribute:apim'])
		.exit(0)
		.it('runs distribute:apim', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});

	test.stdout()
		.command(['distribute:apim', '--help'])
		.exit(0)
		.it('runs distribute:apim --help', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});
});
