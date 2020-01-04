const { Command, flags } = require('@oclif/command');

const { ExecutionPlans, DatasourceConfigs, Docs } = require('../../../../hydrogen-core');

class DatasourceAPIMCommand extends Command {
	async run() {
		const { flags } = this.parse(DatasourceAPIMCommand);

		const version = flags.version;
		const datasource = flags.datasource;
		const replace = flags.replace;

		if (replace) {
			if (datasource === 'mysql') {
				this.log(`Starting to configure WSO2 API Manager ${version}`);
				await ExecutionPlans.Datasource.replaceAPIManagerAMDatasource(
					process.cwd(),
					DatasourceConfigs.MySQL.getDatasourceConfigs('apim', { replace })
				);
				Docs.DatasourceDriver.generateDBDriverDocs('mysql');
			}
		} else {
			this._help();
		}
	}
}

DatasourceAPIMCommand.usage = ['datasource:apim [FLAG] [ARG]'];
DatasourceAPIMCommand.description = `Alter datasource configurations related WSO2 API Manager products with supported datasource config models
...
Alter datasource configurations of WSO2 API Manager server based on your requirement
`;
DatasourceAPIMCommand.examples = [
	`Replace AM_DB H2 datasource with MySQL
$ hydrogen datasource:apim --replace -v 2.6 --datasource mysql`,
];

DatasourceAPIMCommand.flags = {
	datasource: flags.string({
		char: 'd',
		description: 'the type of datasource. refer to the supported options below',
		hidden: false,
		multiple: false,
		required: true,
		options: ['mysql'],
	}),
	replace: flags.boolean({
		char: 'r',
		description: 'replace AM_DB H2 datasource configurations',
		hidden: false,
		multiple: false,
	}),
	version: flags.string({
		char: 'v',
		description: 'version of the WSO2 API Manager',
		hidden: false,
		multiple: false,
		required: true,
		default: '2.6',
		options: ['2.6'],
	}),
};

module.exports = DatasourceAPIMCommand;
