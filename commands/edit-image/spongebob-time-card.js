const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const { wrapText } = require('../../util/Canvas');

module.exports = class SpongebobTimeCardCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spongebob-time-card',
			aliases: ['time-card', 'sb-time-card', 'spongebob-card', 'sb-card', 'sponge-card', 'sponge-time-card'],
			group: 'edit-image',
			memberName: 'spongebob-time-card',
			description: 'Sends a Spongebob Time Card with the text of your choice.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'text',
					prompt: 'What should the text of the time card be?',
					type: 'string',
					max: 280
				}
			]
		});
	}

	async run(msg, { text }) {
		const canvas = createCanvas(1920, 1080);
		const ctx = canvas.getContext('2d');
		const num = Math.floor(Math.random() * 23);
		const base = await loadImage(
			path.join(__dirname, '..', '..', 'assets', 'images', 'spongebob-time-card', `${num}.png`)
		);
		ctx.drawImage(base, 0, 0);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.font = this.client.fonts.get('Spongeboytt1.ttf').toCanvasString(115);
		const lines = await wrapText(ctx, text.toUpperCase(), 1800);
		const topMost = (canvas.height / 2) - (((115 * lines.length) / 2) + ((60 * (lines.length - 1)) / 2));
		for (let i = 0; i < lines.length; i++) {
			const height = topMost + ((115 + 60) * i);
			ctx.fillStyle = '#ecbd3b';
			ctx.fillText(lines[i], (canvas.width / 2) + 6, height + 6);
			ctx.fillStyle = 'black';
			ctx.fillText(lines[i], canvas.width / 2, height);
		}
		return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'spongebob-time-card.png' }] });
	}
};
