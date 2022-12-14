const Command = require('../../structures/Command');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const { shortenText } = require('../../util/Canvas');

module.exports = class LisaPresentationCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bart-chalkboard',
			aliases: ['bart', 'bart-chalk', 'bart-board'],
			group: 'edit-meme',
			memberName: 'bart-chalkboard',
			description: 'Sends a "Bart Chalkboard" meme with the text of your choice.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'text',
					prompt: 'What should the text on the chalkboard be?',
					type: 'string',
					max: 50
				}
			]
		});
	}

	async run(msg, { text }) {
		const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'bart-chalkboard.png'));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.textBaseline = 'top';
		ctx.font = this.client.fonts.get('akbar.ttf').toCanvasString(19);
		ctx.fillStyle = 'white';
		const shortened = shortenText(ctx, text.toUpperCase(), 500);
		const arr = [];
		for (let i = 0; i < 12; i++) arr.push(shortened);
		ctx.fillText(arr.join('\n'), 30, 27);
		return msg.say({ files: [{ attachment: canvas.toBuffer(), name: 'bart-chalkboard.png' }] });
	}
};
