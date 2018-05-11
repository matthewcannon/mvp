export const GENERATE = "GENERATE";
export const START = "START";

export function generate() {
    return {
        type: GENERATE,
    };
}

export function start() {
    return {
        type: START,
    };
}
