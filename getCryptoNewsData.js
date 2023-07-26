/* eslint-disable no-undef */
/* eslint-disable no-promise-executor-return */
import puppeteer from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';
import * as cheerio from 'cheerio';

puppeteer.use(pluginStealth());

export default async function getCryptoNewsData() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto('https://www.coindesk.com/');
  page.waitForNavigation({ waitUntil: 'networkidle0' });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const buttonXPath = '//button[contains(text(), \'OK\')]';
  const [buttonElement] = await page.$x(buttonXPath);
  if (buttonElement) {
    await buttonElement.click();
  } else {
    console.log('button not found.');
  }
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const divContent = await page.evaluate(() => {
    const divElement = document.querySelector('.defaultstyles__LeaderboardWrapper-sc-1hccfhf-0');
    return divElement ? divElement.innerHTML : null;
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const $ = cheerio.load(divContent);
  const sections = [];

  $('div.featured-cardstyles__FeaturedCardWrapper-caozbq-2, div.static-cardstyles__StaticCardWrapper-sc-1kiw3u-0, div.side-cover-cardstyles__SideCoverCardWrapper-sc-1nd3s5z-0, div.side-cover-cardstyles__SideCoverCardWrapper-sc-1nd3s5z-0').each((index, element) => {
    const h2Element = $(element).find('h2');
    const h2Text = h2Element.text();
    const pElement = $(element).find('p');
    const pText = pElement.text();
    const elementObject = {
      title: h2Text,
      subTitle: pText,
    };
    sections.push(elementObject);
  });

  return sections;
}
