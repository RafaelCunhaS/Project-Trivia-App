export const ADD_TOKEN = 'ADD_TOKEN';
export const GET_DATA = 'GET_DATA';
export const GET_USER_DATA = 'GET_USER_DATA';
export const RESET_INFO = 'RESET_INFO';

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const getData = (payload) => ({
  type: GET_DATA,
  payload,
});

export const getUserData = (payload) => ({
  type: GET_USER_DATA,
  payload,
});

export const resetInfo = () => ({ type: RESET_INFO });

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    dispatch(addToken(data.token));
    return data;
  })
  .catch((error) => console.log(error));
