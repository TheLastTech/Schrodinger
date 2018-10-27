import Config from './config.js'
import StreamChecker from './StreamChecker.js'

(async () => {
    let bot = new StreamChecker();
    await bot.Scan();
    setInterval(async () => {
        await bot.Scan();
    }, Config.ScanInterval * 1000);
})();






