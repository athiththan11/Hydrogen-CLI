const { Command, flags } = require('@oclif/command');
const { ConfigMaps, Samples } = require('@athiththan11/hydrogen-core');

const fs = require('fs');
// const ora = require('ora');
const beautify = require('json-beautify');

class ConfigModelCommand extends Command {
	async run() {
		const { flags } = this.parse(ConfigModelCommand);

		const model = flags.model;
		const output = flags.output;
		// const spinner = ora();

		if (!model) {
			this._help();
		}

		try {
			// spinner.start(`Starting to generate configuration model`);

			let configModel = null;
			switch (model) {
				case ConfigMaps.Hydrogen.layout.apim.iskm.toString():
					configModel = Samples.Models.iskmConfs;
					break;
				case ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway.toString():
					configModel = Samples.Models.publishmultiplegatewayConfs;
					break;
				case ConfigMaps.Hydrogen.layout.apim.distributed.toString():
					configModel = Samples.Models.distributedConfs;
					break;
				default:
					this._help();
			}

			if (configModel != null) {
				if (output != null) {
					// spinner.stopAndPersist().start(`Generating configuration model for ${model} layout`);
					await fs.writeFileSync(
						output + `/${model}--layout.config-model.json`,
						beautify(configModel, null, 4),
						{
							encoding: 'utf8',
						}
					);
					// spinner.stopAndPersist();
				}
			}
		} catch (err) {
			this.log(err);
			this.error(err, { exit: true });
		}
	}
}

ConfigModelCommand.usage = ['config-model [COMMAND]'];
ConfigModelCommand.description = `Generate Config Models related to distributed layouts
...
`;

ConfigModelCommand.flags = {
	model: flags.string({
		char: 'm',
		description: 'config model to be generated for a distributed layout',
		hidden: false,
		multiple: false,
		required: false,
		options: [
			ConfigMaps.Hydrogen.layout.apim.iskm,
			ConfigMaps.Hydrogen.layout.apim.distributed,
			ConfigMaps.Hydrogen.layout.apim.publishMultipleGateway,
		],
	}),
	output: flags.string({
		char: 'o',
		description: 'output path to generate the config model',
		hidden: false,
		multiple: false,
		required: false,
		default: '.',
	}),
};

module.exports = ConfigModelCommand;
