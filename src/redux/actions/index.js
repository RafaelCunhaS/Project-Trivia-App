export const ADD_TOKEN = 'ADD_TOKEN';

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const fetchToken = () => (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
  .then((response) => response.json())
  .then((data) => {
    dispatch(addToken(data.token));
    return data;
  })
  .catch((error) => console.log(error));
