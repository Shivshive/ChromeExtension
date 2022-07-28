const { link } = require('fs');
const pupppeteer = require('puppeteer');

(async () => {
    let pages = [];
    const browser = await pupppeteer.launch({ headless: false, timeout: 60000, slowMo: true });
    let links = [
        'https://www.amazon.in',
        'https://www.facebook.com',
        'https://www.flipkart.com',
        'https://www.youtube.com',
        'https://chrome.google.com/webstore/category/extensions'];

    for (const url of links) {
        let p = await browser.newPage();
        await p.setViewport({
            height: 1000,
            width: 800,
            deviceScaleFactor: 1
        });
        await p.goto(url, {
            waitUntil: 'networkidle0',
            waitUntil: 'domcontentloaded'
        });
        await p.bringToFront();
        console.log('executed');
        pages.push(p);
    }
    
    console.log(await browser.wsEndpoint());
    
    // console.log(await p.title());
    console.log('execution compelted');
    await browser.close();

})();