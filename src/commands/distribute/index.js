const { Command } = require('@oclif/command');

class DistributeCommand extends Command {
	async run() {
		this._help();
	}
}

DistributeCommand.usage = ['distribute [COMMAND]'];
DistributeCommand.description = `Configure WSO2 platforms for different distributed setups
...
Configure WSO2 platforms with available distributed setups based on your requirements

Use the following command to list all available 'Distribute' related commands
$ hydrogen distribute --help`;

module.exports = DistributeCommand;
