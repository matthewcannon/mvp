import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Game from "./components/game";

import game from "./reducers/game";
let store = createStore(game);

ReactDOM.render(
    <Provider store={store}>
        <Game/>
    </Provider>,
    document.querySelector('#container')
)
