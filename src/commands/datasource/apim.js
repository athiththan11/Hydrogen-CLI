const { Command, flags } = require('@oclif/command');
const { ExecutionPlans, DatasourceConfigs, Utils, Docker, ConfigMaps } = require('../../../../hydrogen-core');

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
			this.log(`Starting to configure WSO2 API Manager ${version}`);
			// mysql datasource block
			if (datasource === ConfigMaps.Hydrogen.datasource.mysql) {
				if (replace) {
					await ExecutionPlans.Datasource.replaceAPIManagerAMDatasource(
						process.cwd(),
						DatasourceConfigs.MySQL.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { replace })
					);
					if (container) {
						await Docker.MySQL.createMySQLDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ replace, generate },
							process.cwd()
						);
					}
				}
				if (setup) {
					await ExecutionPlans.Datasource.configureAPIManagerDatasources(
						process.cwd(),
						DatasourceConfigs.MySQL.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { setup })
					);
					if (container) {
						await Docker.MySQL.createMySQLDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ setup, generate },
							process.cwd()
						);
					}
				}
				Utils.Docs.generateDBDriverDocs(ConfigMaps.Hydrogen.datasource.mysql);
			}

			// postgre datasource block
			if (datasource === ConfigMaps.Hydrogen.datasource.postgre) {
				if (replace) {
					await ExecutionPlans.Datasource.replaceAPIManagerAMDatasource(
						process.cwd(),
						DatasourceConfigs.Postgre.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { replace })
					);
					if (container) {
						await Docker.Postgre.createPostgreDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ replace, generate },
							process.cwd()
						);
					}
				}
				if (setup) {
					await ExecutionPlans.Datasource.configureAPIManagerDatasources(
						process.cwd(),
						DatasourceConfigs.Postgre.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { setup })
					);
					if (container) {
						await Docker.Postgre.createPostgreDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ setup, generate },
							process.cwd()
						);
					}
				}
				Utils.Docs.generateDBDriverDocs(ConfigMaps.Hydrogen.datasource.postgre);
			}

			// mssql datasource block
			if (datasource === ConfigMaps.Hydrogen.datasource.mssql) {
				if (replace) {
					await ExecutionPlans.Datasource.replaceAPIManagerAMDatasource(
						process.cwd(),
						DatasourceConfigs.MSSQL.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { replace })
					);
					if (container) {
						await Docker.MSSQL.createMSSQLDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ replace, generate },
							process.cwd()
						);
					}
				}
				if (setup) {
					await ExecutionPlans.Datasource.configureAPIManagerDatasources(
						process.cwd(),
						DatasourceConfigs.MSSQL.getDatasourceConfigs(ConfigMaps.Hydrogen.platform.apim, { setup })
					);
					if (container) {
						await Docker.MSSQL.createMSSQLDockerContainer(
							ConfigMaps.Hydrogen.platform.apim,
							{ setup, generate },
							process.cwd()
						);
					}
				}
				Utils.Docs.generateDBDriverDocs(ConfigMaps.Hydrogen.datasource.mssql);
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
		options: [
			ConfigMaps.Hydrogen.datasource.mysql,
			ConfigMaps.Hydrogen.datasource.postgre,
			ConfigMaps.Hydrogen.datasource.mssql,
		],
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
