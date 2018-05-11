import * as WorldActions from "../actions/world";
import InitialState from "./initialState";

function world(state = InitialState.world, action) {
    let nextState = {};

    switch (action.type) {
        case WorldActions.GENERATE:
            nextState = Object.assign({}, state, {
                generation: state.generation + 1,
            });
            break;

        default:
            nextState = state;
    }

    return Object.freeze(nextState);
}

function game(state = InitialState, action) {
    let nextState = {};

    switch (action.type) {
        case WorldActions.GENERATE:
            nextState = Object.assign({}, state, {
                world: world(state.world, action),
            });
            break;

        case WorldActions.START:
            nextState = Object.assign({}, state, {
                actors: [],
            });
            break;

        default:
            nextState = Object.assign({}, state);
    }

    return Object.freeze(nextState);
}

export default game;
