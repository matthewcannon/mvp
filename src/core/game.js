import * as WorldActions from "../actions/world";

export function refresh(actors, dispatch) {
    dispatch(WorldActions.generate());
}

export function start(dispatch) {
    dispatch(WorldActions.start());
}
