const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: process.env.MC_SERVER,
  port: parseInt(process.env.MC_PORT || '25565'),
  username: process.env.MC_USERNAME || 'AFK_Bot',
  version: process.env.MC_VERSION || false,
});

bot.on('spawn', () => {
  console.log('✅ Бот подключился!');
  if (process.env.ANTI_AFK === 'true') {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 300);
    }, 60_000);
  }
});

bot.on('end', () => {
  console.log('⚠️ Бот отключён');
  if (process.env.RECONNECT === 'true') {
    setTimeout(() => process.exit(1), 5000);
  }
});
