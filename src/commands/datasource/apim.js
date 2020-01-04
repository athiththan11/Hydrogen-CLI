const { Command, flags } = require('@oclif/command');
const { ExecutionPlans, DatasourceConfigs, Docs, Docker } = require('../../../../hydrogen-core');

class DatasourceAPIMCommand extends Command {
	async run() {
		const { flags } = this.parse(DatasourceAPIMCommand);

		const version = flags.version;
		const datasource = flags.datasource;
		const replace = flags.replace;
		const container = flags.container;
		const generate = flags.generate;
		const setup = flags.setup;

		if (replace || setup) {
			if (datasource === 'mysql') {
				this.log(`Starting to configure WSO2 API Manager ${version}`);
				if (replace) {
					await ExecutionPlans.Datasource.replaceAPIManagerAMDatasource(
						process.cwd(),
						DatasourceConfigs.MySQL.getDatasourceConfigs('apim', { replace })
					);
					if (container) {
						await Docker.MySQL.createMySQLDockerContainer('apim', { replace, generate }, process.cwd());
					}
				}
				if (setup) {
					await ExecutionPlans.Datasource.configureAPIManagerDatasources(
						process.cwd(),
						DatasourceConfigs.MySQL.getDatasourceConfigs('apim', { setup })
					);
					if (container) {
						await Docker.MySQL.createMySQLDockerContainer('apim', { setup, generate }, process.cwd());
					}
                }
                Docs.DatasourceDriver.generateDBDriverDocs('mysql');
			}
		}

		if (!replace && !setup) {
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
	container: flags.boolean({
		char: 'c',
		description: 'create a docker container for the datasource',
		hidden: false,
		multiple: false,
		required: false,
	}),
	datasource: flags.string({
		char: 'd',
		description: 'the type of datasource. refer to the supported options below',
		hidden: false,
		multiple: false,
		required: true,
		options: ['mysql'],
	}),
	generate: flags.boolean({
		char: 'g',
		description: 'create database and tables in the docker container',
		hidden: false,
		multiple: false,
		required: false,
		dependsOn: ['container'],
	}),
	replace: flags.boolean({
		char: 'r',
		description: 'replace AM_DB H2 datasource configurations',
		hidden: false,
		multiple: false,
	}),
	setup: flags.boolean({
		char: 's',
		description: 'configure AM, UM & REG datasources',
		hidden: false,
		multiple: false,
		exclusive: ['replace'],
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
