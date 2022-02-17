export const ADD_TOKEN = 'ADD_TOKEN';
export const GET_DATA = 'GET_DATA';
export const GET_USER_DATA = 'GET_USER_DATA';

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});
export const getData = (payloadData) => {
  console.log('chamou getData');
  console.log(payloadData);
  return {
    type: GET_DATA,
    payloadData,
  };
};

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    dispatch(addToken(data.token));
    return data;
  })
  .catch((error) => console.log(error));

export const getUserData = (payloadUserData) => {
  console.log('chosldfka');
  console.log(payloadUserData);
  return {
    type: GET_USER_DATA,
    payloadUserData,
  };
};
