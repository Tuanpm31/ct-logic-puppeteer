const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://id.chotot.com/', { timeout: 0, waitUntil: 'networkidle0' });

  // get form with class mocked-styled-13
  const form = await page.$('.mocked-styled-13');
  console.log(form);

  // form have 2 input, first is phone number, second is password
  const inputs = await form.$$('input');
  await inputs[0].type(''); // phone number

  // input second with value 
  await inputs[1].type(''); // password

  // click the button with class login-btn
  const button = await form.$('.login-btn');
  await button.click();

  // wait 5 seconds
  await page.waitForTimeout(3000);

  // check if page contains content "Sai số điện thoại hoặc mật khẩu"
  const content = await page.content();
  if (content.includes('Phát hiện đăng nhập tài khoản trên thiết bị mới')) {
    // find div with class mocked-styled-4
    const div = await page.$('.mocked-styled-4');
    // first button is "Đăng nhập"
    const buttons = await div.$$('button');
    await buttons[0].click();
    // wait new page loaded
    await page.waitForTimeout(5000);

    // take a screenshot
    await page.screenshot({ path: 'screenshot.png' });
  } else {
    await page.waitForTimeout(3000);
    const cookies = await page.cookies();
    // find cookie with name privateToken
    const cookie = cookies.find(c => c.name === 'privateToken');
    if (!cookie) {
      throw new Error('Cookie not found');
    }
    console.log(cookie.value);
  }

  await browser.close();
})();