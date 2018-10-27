import Config from './config'
import Discord from "discord.js";

export class DiscordAnnouncer {
    OnMessage(msg) {
        if (msg.content === 'ping') {
            msg.reply('Pong!');
        }
    }

    constructor() {
        this.Ready = false;
        this.PendingMessages = [];
        this.client = new Discord.Client();
        this.client.on('ready', this.BotReady.bind(this));
        this.client.on('presenceUpdate', this.MemberUpdate.bind(this))
        this.client.on('message', this.OnMessage.bind(this));
        this.client.login(Config.DiscordBotToken);
    }

    MemberUpdate(Old, New) {

        if (New.presence.game && !Old.presence.game) {
            this.AnnounceMonitor(`${New.user} Started ${New.presence.game.name}`);

        }
        if (Old.presence.game && !New.presence.game) {

            this.AnnounceMonitor(`${Old.user} Is Still Playing ${Old.presence.game.name}  `);
        }
        if (Old.presence.game && New.presence.game) {
            if (!Old.presence.game.equals(New.presence.game)) {
                if (Old.presence.game.timestamps && !New.presence.game.timestamps) {

                    this.AnnounceMonitor(`${New.user} changed from ${Old.presence.game} to ${New.presence.game.name}  `);
                }
                if (Old.presence.game.timestamps && New.presence.game.timestamps && (!Old.presence.game.timestamps.end && !New.presence.game.timestamps.end)) {

                    this.AnnounceMonitor(`${New.user} changed from ${Old.presence.game}   to ${New.presence.game.name}  `);
                }


            } else {


                this.AnnounceMonitor(`${Old.user} Is Still Playing ${Old.presence.game.name}  `);
            }
        }

    }


    BotReady() {
        this.Ready = true;
        console.log(`Logged in as ${this.client.user.tag}!`);
        this.PendingMessages.forEach(A => {
            this.Announce(A);
        })

    }

    AnnounceMonitor(Announcement) {

        Config.PresenceAnnounceSpots.forEach(Spot => {
            let Channel = this.client.channels.get(Spot);
            if (!Channel) return;
            Channel.send(Announcement);

        })

    }

    Announce(Stream) {
        if (!this.Ready) {
            this.PendingMessages.push(Stream);
        }

        Config.AnnounceSpots.forEach(Spot => {
            let Channel = this.client.channels.get(Spot);
            if (!Channel) return;
            Channel.send(Config.Announce(Stream.channel.status, Stream.channel.display_name, Stream.game, Stream.channel.url));

        })

    }
}
