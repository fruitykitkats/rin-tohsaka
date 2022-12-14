const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, embedURL } = require('../../util/Util');
const { GITHUB_ACCESS_TOKEN, RIN_GITHUB_REPO_USERNAME, RIN_GITHUB_REPO_NAME } = process.env;

module.exports = class ChangelogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'changelog',
			aliases: ['updates', 'commits'],
			group: 'core',
			memberName: 'changelog',
			description: 'Responds with the bot\'s latest 10 commits.',
			guarded: true
		});
	}

	async run(msg) {
		const { body } = await request
			.get(`https://api.github.com/repos/${RIN_GITHUB_REPO_USERNAME}/${RIN_GITHUB_REPO_NAME}/commits`)
			.set({ Authorization: `token ${GITHUB_ACCESS_TOKEN}` });
		const commits = body.slice(0, 10);
		const embed = new MessageEmbed()
			.setTitle(`[${RIN_GITHUB_REPO_NAME}:master] Latest 10 commits`)
			.setColor(0x7289DA)
			.setURL(`https://github.com/${RIN_GITHUB_REPO_USERNAME}/${RIN_GITHUB_REPO_NAME}/commits/master`)
			.setDescription(commits.map(commit => {
				const hash = embedURL(`\`${commit.sha.slice(0, 7)}\``, commit.html_url, false);
				return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
			}).join('\n'));
		return msg.embed(embed);
	}
};
