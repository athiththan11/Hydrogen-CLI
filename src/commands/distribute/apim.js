const { Command, flags } = require('@oclif/command');
const { ExecutionPlans, ConfigMaps } = require('../../../../hydrogen-core');

class DistributeAPIMCommand extends Command {
    async run() {
        const { flags } = this.parse(DistributeAPIMCommand);

        const version = flags.version;
        if (flags['multiple-gateway']) {
            this.log(`Starting to configure WSO2 API Manager ${version}`);
            if (flags['multiple-gateway']) {
                this.log(`Deployment setup "Publishing Through Multiple Gateway"`);
                // TODO: implement publish-through multiple gateway
                await ExecutionPlans.Deployment.configurePublishMultipleGateway(process.cwd(), 2);
            }
        }

    }
}

DistributeAPIMCommand.usage = ['distribute:apim [FLAG] [ARG]'];
DistributeAPIMCommand.description = `Configure WSO2 API Manager products for distributed deployments with supported config models
...
Configure WSO2 API Manager products for distributed deployments and setups based on your requirement
`;
DistributeAPIMCommand.examples = [];

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
		options: [
			ConfigMaps.Hydrogen.datasource.mysql,
			ConfigMaps.Hydrogen.datasource.postgre,
			ConfigMaps.Hydrogen.datasource.mssql
		]
	}),
	generate: flags.boolean({
		char: 'g',
		description: 'create database and tables in the docker container',
		hidden: false,
		multiple: false,
		required: false,
		dependsOn: ['container']
	}),
	'multiple-gateway': flags.boolean({
		char: 'M',
		description: 'deployment setup for publish through multiple-gateways',
		hidden: false,
		multiple: false,
		required: false
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
