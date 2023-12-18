const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://id.chotot.com/login/otp?phone=0962436621&continue=', { timeout: 0, waitUntil: 'networkidle0' });

  // get div with class mocked-styled-39
  const div = await page.$('.mocked-styled-34');

  // loop each input and type value
  const inputs = await div.$$('input');
  await inputs[0].type('3');
  await inputs[1].type('6');
  await inputs[2].type('4');
  await inputs[3].type('7');
  await inputs[4].type('2');
  await inputs[5].type('9');

  // click button in this div

  const submitDiv = await page.$('.mocked-styled-36');
  const button = await submitDiv.$('button');

  await button.click();

  // wait 5 seconds
  await page.waitForTimeout(5000);

  // screenshot
  await page.screenshot({ path: 'screenshot1.png' });

  const cookies = await page.cookies();
  // find cookie with name privateToken
  const cookie = cookies.find(c => c.name === 'privateToken');
  if (!cookie) {
    throw new Error('Cookie not found');
  }
  console.log(cookie.value);

  await browser.close();
})();