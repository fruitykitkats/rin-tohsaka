const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const opinions = ['👍', '👎'];

module.exports = class OpinionCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'opinion',
			group: 'fun',
			memberName: 'opinion',
			description: 'Determines the opinion on something.',
			args: [
				{
					key: 'question',
					prompt: 'What do you want to get an opinion on?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(stripIndents`
			_${question}_
			${opinions[Math.floor(Math.random() * opinions.length)]}
		`);
	}
};
