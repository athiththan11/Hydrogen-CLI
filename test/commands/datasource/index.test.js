const { expect, test } = require('@oclif/test');
const { describe } = require('mocha');

describe('datasource index', () => {
	test.stdout()
		.command(['datasource'])
		.exit(0)
		.it('runs datasource', (ctx) => {
			expect(ctx.stdout).to.contain(
				'Alter datasource configurations of WSO2 Platforms with supported config models and database vendors'
			);
		});
});
