const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const { wrapText } = require('../../util/Canvas');

module.exports = class GenieRulesCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'genie-rules',
			aliases: ['genie', '4-rules', 'four-rules', 'there-are-four-rules', 'there-are-4-rules'],
			group: 'edit-meme',
			memberName: 'genie-rules',
			description: 'Sends a "There are 4 rules" meme with the text of your choice.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'text',
					prompt: 'What do you want to wish for?',
					type: 'string',
					max: 500
				}
			]
		});
	}

	async run(msg, { text }) {
		const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'genie-rules.png'));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		ctx.font = this.client.fonts.get('Noto-Regular.ttf').toCanvasString(40);
		let fontSize = 40;
		while (ctx.measureText(text).width > 1143) {
			fontSize--;
			ctx.font = this.client.fonts.get('Noto-Regular.ttf').toCanvasString(fontSize);
		}
		const lines = await wrapText(ctx, text, 381);
		const topMost = 580 - (((fontSize * lines.length) / 2) + ((20 * (lines.length - 1)) / 2));
		for (let i = 0; i < lines.length; i++) {
			const height = topMost + ((fontSize + 20) * i);
			ctx.fillText(lines[i], 220, height);
		}
		return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'genie-rules.png' }] });
	}
};
