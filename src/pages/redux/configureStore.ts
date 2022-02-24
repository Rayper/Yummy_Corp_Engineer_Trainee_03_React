import { createStore } from "redux";
import { setUserReducers } from "./reducers/setUserReducers";

export const configureStore = () => {
    return createStore(setUserReducers);
}