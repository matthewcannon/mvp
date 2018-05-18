import "babel-polyfill";
import * as Chai from "chai";
const Puppeteer = require("puppeteer");

Chai.should();

describe("Landing", function() {
    describe("Content", function() {
        it("Title should be 'MVP'", function(done) {
            var pageTitle;
            (async () => {
                const browser = await Puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto("http://localhost:8080");
                pageTitle = await page.title();
                await browser.close();
            })()
                .then(x => {
                    pageTitle.should.equal("MVP");
                    done(x);
                })
                .catch(e => {
                    done(e);
                });
        });
    });
});
