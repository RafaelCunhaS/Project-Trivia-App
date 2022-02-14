import { ADD_TOKEN } from '../actions';

const INITIAL_STATE = '';

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return action.payload;

  default:
    return state;
  }
};

export default tokenReducer;
