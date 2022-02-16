import { GET_DATA } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_DATA: {
    return {
      ...state,
      name: action.payloadData.name,
      gravatarEmail: action.payloadData.email,
    };
  }
  default:
    return state;
  }
};

export default playerReducer;
