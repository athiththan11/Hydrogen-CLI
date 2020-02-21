const { expect, test } = require('@oclif/test');
const { describe } = require('mocha');

describe('datasource apim', () => {
	let desc =
		'Alter datasource configurations related WSO2 API Manager products with supported datasource config models';

	test.stdout()
		.command(['datasource:apim'])
		.exit(0)
		.it('runs datasource:apim', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});

	test.stdout()
		.command(['datasource:apim', '--help'])
		.exit(0)
		.it('runs datasource:apim --help', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});
});
