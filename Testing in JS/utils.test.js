const  puppeteer  = require('puppeteer');
const {generateText} = require('./util');

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('should add user', async () => {
    const browser= await puppeteer.launch({  
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///home/developer/code/Practice/Testing%20in%20JS/index.html')
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '28');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (28 years old)');
}, 10000) // Timeout in milliseconds for the test after which it will fail as its taking too long to execute