import { CSRF, BASE_URL } from '../configs/constants.js';

export const validate = (user, password) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer yourAccessTokenHere',
    },
    body: JSON.stringify({
      user: user,
      password: password
    })
  };
  // do request
  return fetch(`${BASE_URL}user/validate`, requestOptions)
    .then(response => {
      //console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      throw error; // Re-lanzar el error para manejarlo en el componente
    });
};
