import { combineReducers } from 'redux';
import playerReducer from './player';
import tokenReducer from './token';

const rootReducer = combineReducers({ player: playerReducer, token: tokenReducer });

export default rootReducer;
