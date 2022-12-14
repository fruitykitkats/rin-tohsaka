const Command = require('../../structures/Command');
const { safe, nsfw } = require('../../assets/json/never-have-i-ever');
const all = [...safe, ...nsfw];

module.exports = class NeverHaveIEverCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'never-have-i-ever',
			aliases: ['nhie', 'never-have-i', 'never-have', 'never-ever'],
			group: 'fun',
			memberName: 'never-have-i-ever',
			description: 'Responds with a random "Never Have I Ever..." statement.'
		});
	}

	run(msg) {
		if (msg.channel.nsfw) return msg.say(all[Math.floor(Math.random() * all.length)]);
		return msg.say(safe[Math.floor(Math.random() * safe.length)]);
	}
};
