export default {
    TwitchClientID: '', //https://dev.twitch.tv/dashboard
    UsersToAnnouce:[''],
    ScanInterval: 15, //in seconds
    AnnounceInterval: 720, // in minutes best to put as 12 hour or so so only one notification goes out every so many hours. Longer than you think the streamer will stream.
    DiscordBotToken:'', //https://discordapp.com/developers/applications/
    Announce: (Status,DisplayName,Game,Url)=>{
        return `${DisplayName} is live ${Status} playing ${Game} at ${Url}`;
    },
    AnnounceSpots :[''] //channel ids

}
