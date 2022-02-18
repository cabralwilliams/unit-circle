import reducer from './reducers';
import { createStore } from 'redux';

const store = createStore(reducer, { timeLeft: 120000, gameMode: null, buttonValues: [] });

export { store };