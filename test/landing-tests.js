import "babel-polyfill";
import * as Chai from "chai";
import * as Query from "./lib/query.js";

Chai.should();

describe("Landing", function() {
    describe("Content", function() {
        it("Title should be correct", function(done) {
            (async () => {
                return Query.PageTitle();
            })()
                .then(pageTitle => {
                    pageTitle.should.equal("MVP");
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
});
