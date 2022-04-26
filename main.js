const { Client, Intents, MessageEmbed } = require('discord.js');
const request = require('request');
require('dotenv').config()

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

const PREFIX = '$';
const TOKEN = process.env.TOKEN;

// settings
let X = 2560;
let Y = 1440;

client.on('ready', () => {
    console.log('Ready!');
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`${message.author.username} used the command ${command}`);


    if (command === 'ping') {
        message.channel.send('Pong! 🪜');
    }

    if (command == 'wallpaper') {
        request(`https://picsum.photos/${X}/${Y}`, { json: true },
            (err, res, body) => {
                if (err) { return message.send(err); }

                let image = res.request.uri.href;
                console.log(image);

                if (image) {
                    let embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`Here's your wallpaper:`)
                        .setImage(image)
                        .setURL(image);
    
                    return message.channel.send({
                        embeds: [embed]
                    });
                } else {
                    return message.channel.send('No image found!');
            }

        });
    }

});

client.login(TOKEN);
