import { GET_DATA, GET_USER_DATA } from '../actions';

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
      name: action.payloadData.name,
      assertions: 0,
      score: 0,
      gravatarEmail: action.payloadData.email,
    };
  }
  case GET_USER_DATA: {
    return {
      ...state,
      assertions: action.payloadUserData.assertions,
      score: action.payloadUserData.score,
    };
  }
  default:
    return state;
  }
};

export default playerReducer;
