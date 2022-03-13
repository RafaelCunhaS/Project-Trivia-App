import { GET_DATA, GET_USER_DATA, RESET_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_DATA: {
    return {
      ...state,
      name: action.payload.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.payload.email,
    };
  }
  case GET_USER_DATA: {
    return {
      ...state,
      assertions: action.payload.assertions,
      score: action.payload.score,
    };
  }
  case RESET_INFO:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default playerReducer;
