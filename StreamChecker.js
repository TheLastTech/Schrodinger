import Bluebird from "bluebird";
import Api from 'twitch-api-v5';
import Config from './config.js'
import FileSeener from "./FileSeener";
import {DiscordAnnouncer} from "./DiscordAnnouncer";


export default class StreamChecker {
    constructor() {
        Api.clientID = Config.TwitchClientID;
        this.UserChecker = Bluebird.promisify(Api.users.usersByName);
        this.UsersToCheck = {users: Config.UsersToAnnouce};
        this.ChannelLiveChecker = Bluebird.promisify(Api.streams.live);
        this.DiscordBot = new DiscordAnnouncer();
        this.FileSeener = new FileSeener();

    }

    async Scan() {
        try {
            let UsersStatus = await this.UserChecker(this.UsersToCheck);
            UsersStatus.users.forEach(this.CheckUserStream.bind(this));

        } catch (err) {
            console.log(err);
        }
    }

    async CheckUserStream(User) {
        try {
            if(!this.FileSeener.CanUpdate(User)) return;

            let IsLive = await this.ChannelLiveChecker({channel: User._id});
            if(IsLive.streams.length > 0) {
                this.DiscordBot.Announce(IsLive.streams[0],User);
                this.FileSeener.MarkUpdate(User);
            }

        } catch (err) {
            console.log(err);
        }
    }
}

