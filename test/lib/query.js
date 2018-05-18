const Puppeteer = require("puppeteer");

const PageTitle = async () => {
    const browser = await Puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://localhost:8080");
    let pageTitle = await page.title();
    await browser.close();
    return pageTitle;
};

export { PageTitle };
