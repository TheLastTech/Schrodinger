import Config from "./config";
import fs from 'fs'

export default class FileSeener {
    constructor() {
        if (fs.existsSync('./seen.json')) {
            this.Log = JSON.parse(fs.readFileSync('seen.json', 'utf8'))
        }
        if (!this.Log) {
            this.Log = {};
        }
    }

    MarkUpdate(User) {
        this.Log[User._id] = +(new Date());
        fs.writeFileSync('./seen.json', JSON.stringify(this.Log));
    }

    CanUpdate(User) {
        if (!(User._id in this.Log)) {
            return true;
        }

        let SecondsSinceLastSeen = (((+(new Date())) - this.Log[User._id]) / 1000);
        console.log(`${User.display_name} was announced ${SecondsSinceLastSeen} seconds ago`);
        return SecondsSinceLastSeen > Config.AnnounceInterval * 60;
    }

}
