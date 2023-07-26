/* eslint-disable array-callback-return */
/* eslint-disable import/extensions */
import 'dotenv/config';
import { Telegraf } from 'telegraf';
import getCryptoNewsData from './getCryptoNewsData.js';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply('Welcome to Crypto News Bot! You will receive the latest cryptocurrency news here.');
});

bot.command('news', async (ctx) => {
  ctx.reply('seeking information...');
  const news = await getCryptoNewsData();
  let message = '';
  news.forEach((item, index) => {
    message += `${index + 1}. ${item.title}\n`;
    message += `${item.subTitle}\n\n`;
  });
  ctx.reply(message);
});

bot.launch().then(() => {
  console.log('Crypto News Bot is running...');
}).catch((error) => {
  console.error('Error starting bot:', error);
});
