const { expect, test } = require('@oclif/test');
const { describe } = require('mocha');

describe('datasource is', () => {
	let desc =
		'Alter datasource configurations related WSO2 Identity Server products with supported datasource config models';
	test.stdout()
		.command(['datasource:is'])
		.exit(0)
		.it('runs datasource:is', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});

	test.stdout()
		.command(['datasource:is', '--help'])
		.exit(0)
		.it('runs datasource:is', (ctx) => {
			expect(ctx.stdout).to.contain(desc);
		});
});
