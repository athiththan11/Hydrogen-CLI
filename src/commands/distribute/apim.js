const { Command, flags } = require('@oclif/command');
const { DatasourceConfigs, ExecutionPlans, Utils, ConfigMaps, Samples, Schemas } = require('../../../../hydrogen-core');

class DistributeAPIMCommand extends Command {
	async run() {
		const { flags } = this.parse(DistributeAPIMCommand);

		const datasource = flags.datasource;
		const version = flags.version;

		// config parser
		let config = {};
		if (flags.config) {
			config = await Utils.Parser.configParser(require('path').join(process.cwd(), flags.config));
		}

		if (
			flags[ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway] ||
			flags[ConfigMaps.Hydrogen.layout.apim.iskm]
		) {
			this.log(`Starting to configure WSO2 API Manager ${version}`);
			// publish-multiple-gateway block
			if (flags[ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]) {
				// set sample model configurations
				let environmentConfs = Samples.Models.environmentConfs;
				let layoutConfs = Samples.Models.layoutConfs;

				if (flags.config && config != null) {
					// validate the parsed configuration against the schema model
					let valid = await Utils.Parser.validateConfigs(
						Schemas.LayoutConfs.publishMultipleGatewaySchema,
						config
					);

					// if validation fails stop the process
					if (!valid.valid) {
						return valid.message == null
							? this.log('Given configuration is not complying with the expected schema')
							: this.log(valid.message);
					}

					environmentConfs = config.environmentConfs;
					layoutConfs = config.layoutConfs;
				}

				if (flags.count >= 2) {
					this.log(
						`Deployment setup "Publishing Through Multiple Gateway" with Gateway Nodes : ${flags.count}`
					);

					await ExecutionPlans.Deployment.configurePublishMultipleGateway(
						process.cwd(),
						flags.count,
						layoutConfs,
						environmentConfs
					);
					await Utils.Docs.generatePublishMultipleGatewayDocs(flags.count, layoutConfs);
				} else {
					this.log('\n' + 'ERROR :: Number of Gateway nodes should be 2 (default) or more' + '\n');
					this._help();
				}
			}
			// is-km block
			if (flags[ConfigMaps.Hydrogen.layout.apim.iskm]) {
				// set sample model configurations
				let apimlayoutConfs = Samples.Models.apimlayoutConfs;
				let iskmlayoutConfs = Samples.Models.iskmlayoutConfs;

				// TODO: read & validate the configurations

				// TODO: get datasource configurations
				let datasourceConfs = null;
				if (datasource === ConfigMaps.Hydrogen.datasource.mysql)
					datasourceConfs = await DatasourceConfigs.MySQL.getDatasourceConfigs(
						ConfigMaps.Hydrogen.platform.apim,
						{ setup: true }
					);
				if (datasource === ConfigMaps.Hydrogen.datasource.mssql)
					datasourceConfs = await DatasourceConfigs.MSSQL.getDatasourceConfigs(
						ConfigMaps.Hydrogen.platform.apim,
						{ setup: true }
					);
				if (datasource === ConfigMaps.Hydrogen.datasource.postgre)
					datasourceConfs = await DatasourceConfigs.Postgre.getDatasourceConfigs(
						ConfigMaps.Hydrogen.platform.apim,
						{ setup: true }
					);

				if (datasourceConfs != null) {
					this.log(`Deployment setup "Identity Server as Key Manager"`);

					await ExecutionPlans.Deployment.configureIdentityServerasKeyManager(
						process.cwd(),
						datasourceConfs,
						apimlayoutConfs,
						iskmlayoutConfs
					);
				}

				// TODO: error message no supported datasource defined
			}
		}
	}
}

DistributeAPIMCommand.usage = ['distribute:apim [FLAG] [ARG]'];
DistributeAPIMCommand.description = `Configure WSO2 API Manager products for distributed deployments with supported config models
...
Configure WSO2 API Manager products for distributed deployments and setups based on your requirement
`;
DistributeAPIMCommand.examples = [
	`Setup Publish through Multiple Gateway deployment with 2 Gateway Nodes and a AIO
$ hydrogen distribute:apim --publish-multiple-gateway --nodes 2`
];

DistributeAPIMCommand.flags = {
	container: flags.boolean({
		char: 'c',
		description: 'create a docker container for the datasource',
		hidden: false,
		multiple: false,
		required: false,
		dependsOn: ['datasource']
	}),
	datasource: flags.string({
		char: 'd',
		description: 'the type of datasource. refer to the supported options below',
		hidden: false,
		multiple: false,
		required: true,
		default: ConfigMaps.Hydrogen.datasource.mysql,
		options: [
			ConfigMaps.Hydrogen.datasource.mysql,
			ConfigMaps.Hydrogen.datasource.postgre,
			ConfigMaps.Hydrogen.datasource.mssql
		],
		exclusive: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]
	}),
	generate: flags.boolean({
		char: 'g',
		description: 'create database and tables in the docker container',
		hidden: false,
		multiple: false,
		required: false,
		dependsOn: ['container']
	}),
	'is-km': flags.boolean({
		char: 'I',
		description: 'deployment setup for identity server as key manager',
		hidden: false,
		multiple: false,
		required: false,
		exclusive: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]
	}),
	'publish-multiple-gateway': flags.boolean({
		char: 'M',
		description: 'deployment setup for publish through multiple-gateways',
		hidden: false,
		multiple: false,
		required: false,
		exclusive: [ConfigMaps.Hydrogen.layout.apim.iskm]
	}),
	count: flags.integer({
		char: 'n',
		description: 'number of gateway nodes to be configured for publish-multiple-gateway layout',
		hidden: false,
		multiple: false,
		required: false,
		dependsOn: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]
	}),
	config: flags.string({
		char: 'C',
		description: 'JSON configuration path',
		hidden: false,
		required: false,
		dependsOn: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway, ConfigMaps.Hydrogen.layout.apim.iskm]
	}),
	version: flags.string({
		char: 'v',
		description: 'version of the WSO2 API Manager',
		hidden: false,
		multiple: false,
		required: true,
		default: '2.6',
		options: ['2.6']
	})
};

module.exports = DistributeAPIMCommand;
