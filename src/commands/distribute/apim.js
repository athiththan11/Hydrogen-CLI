const { Command, flags } = require('@oclif/command');
const { ExecutionPlans, Utils, ConfigMaps } = require('../../../../hydrogen-core');

class DistributeAPIMCommand extends Command {
	async run() {
		const { flags } = this.parse(DistributeAPIMCommand);

		const version = flags.version;
		if (flags[ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]) {
			this.log(`Starting to configure WSO2 API Manager ${version}`);
			if (flags[ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]) {
				if (flags.nodes >= 2) {
					this.log(
						`Deployment setup "Publishing Through Multiple Gateway" with Gateway Nodes : ${flags.nodes}`
					);

					// TODO: get the configurations from file-system and pass
					let environmentConfs = [
						{
							type: 'production',
							'api-console': true,
							_name: 'Production environment one',
							_description: 'a sample environment',
							_hostname: 'localhost',
							username: 'something',
							offset: 1
						},
						{
							type: 'staging',
							'api-console': true,
							_name: 'Staging environment one',
							_description: 'a sample stage environment',
							_hostname: 'localhost',
							offset: 2
						}
					];
					let layoutConfs = {
						_hostname: 'https://localhost',
						thriftClientPort: '10397',
						enableThriftServer: 'false',
						offset: 0
					};

					await ExecutionPlans.Deployment.configurePublishMultipleGateway(
						process.cwd(),
						flags.nodes,
						layoutConfs,
						environmentConfs
					);
					Utils.Docs.generatePublishMultipleGatewayDocs(flags.nodes, layoutConfs);
				} else {
					// FIXME: change the error messages
					this.log('\nERROR :: Number of Gateway nodes should be 2 (default) or more\n');
					this._help();
				}
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
	'publish-multiple-gateway': flags.boolean({
		char: 'M',
		description: 'deployment setup for publish through multiple-gateways',
		hidden: false,
		multiple: false,
		required: false
	}),
	nodes: flags.integer({
		char: 'n',
		description: 'number of gateway nodes to be configured for publish-multiple-gateway layout',
		hidden: false,
		multiple: false,
		required: true,
		default: 2,
		dependsOn: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway],
		parse: Number
	}),
	config: flags.string({
		char: 'C',
		description: 'JSON configuration path',
		hidden: false,
		required: false,
		dependsOn: [ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway]
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
