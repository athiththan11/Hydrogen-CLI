const { expect, test } = require('@oclif/test');
const { describe } = require('mocha');

describe('distribute index', () => {
	test.stdout()
		.command(['distribute'])
		.exit(0)
		.it('runs distribute', (ctx) => {
			expect(ctx.stdout).to.contain('Configure WSO2 platforms for different distributed setups');
		});
});
