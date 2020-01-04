const { Command } = require('@oclif/command');

class DatasourceCommand extends Command {
	async run() {
		this._help();
	}
}

DatasourceCommand.usage = [` datasource [COMMAND]`];
DatasourceCommand.description = `Alter datasource configurations of WSO2 Platforms with supported config models and database vendors
...
Alter datasource configurations of WSO2 Platforms based on your requirements

Use the following command to list all available 'Datasource' related commands
$ hydrogen datasource --help
`;

module.exports = DatasourceCommand;
