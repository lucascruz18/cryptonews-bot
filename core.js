import'dotenv/config'
import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

bot.command('start', (ctx) => {
    ctx.reply('Welcome to Crypto News Bot! You will receive the latest cryptocurrency news here.');
});

bot.command('news', async (ctx) => {
    ctx.reply('This is a news.');
});

bot.launch().then(() => {
    console.log('Crypto News Bot is running...');
  }).catch((error) => {
    console.error('Error starting bot:', error);
  });