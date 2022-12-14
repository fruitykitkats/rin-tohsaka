const Command = require('../../structures/Command');
const { stripIndents } = require('common-tags');
const answers = require('../../assets/json/8-ball');

module.exports = class EightBallCommand extends Command {
	constructor(client) {
		super(client, {
			name: '8-ball',
			aliases: ['magic-8-ball', 'eight-ball', 'magic-eight-ball'],
			group: 'fun',
			memberName: '8-ball',
			description: 'Asks your question to the Magic 8 Ball.',
			args: [
				{
					key: 'question',
					prompt: 'What do you want to ask the 8 ball?',
					type: 'string',
					max: 1950
				}
			]
		});
	}

	run(msg, { question }) {
		return msg.say(stripIndents`
			_${question}_
			🎱 ${answers[Math.floor(Math.random() * answers.length)]} 🎱
		`);
	}
};
