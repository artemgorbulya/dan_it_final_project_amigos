import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    devTools(applyMiddleware(thunk)),
);