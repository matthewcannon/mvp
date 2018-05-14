import * as chai from "chai";
import { loadAssets } from "../../src/core/asset-loader";

chai.should();

// Mutation testing?

// Characterization?

describe.only("Loading assets", () => {
    it("Behaves like this", done => {
        let onLoadComplete = null;
        const game = {
            load: {
                pack: () => {
                    // Finish immediately.
                    onLoadComplete();
                },
                onLoadComplete: {
                    add: func => {
                        onLoadComplete = func;
                    },
                },
                totalQueuedPacks: () => {
                    return 0;
                },
                json: (key, url) => {
                    // Finish immediately.
                    onLoadComplete();
                },
                start: () => {
                    // Finish immediately.
                    onLoadComplete();
                },
            },
            time: {
                events: {
                    add: (period, func, context) => {
                        Function.prototype.apply(func, context);
                    },
                },
            },
            cache: {
                getJSON: key => {},
            },
            state: {
                states: {},
            },
        };

        const gamePacks = {
            key: {
                53: {
                    // Code will add a property named 'data' to this object.
                },
            },
            url: {},
        };

        const loadScreenPack = {
            key: {
                64: {
                    // Code will add a property named 'data' to this object.
                },
            },
            url: {},
        };

        loadAssets(game, gamePacks, loadScreenPack, () => {
            return;
        }).then(
            keyLookups => {
                done();
                keyLookups.should.equal({});
            },
            thing => {
                done();
                console.log("Rejected with " + thing);
            },
        );
    });
});
