import { createStore } from 'redux';
import rootReducer from './reducers';
import { loadState, saveState } from "./utils/localStorage"

const initialState = {};

const store = createStore(rootReducer, initialState);

store.subscribe(() => {
    saveState(store.getState())
});

export default store;