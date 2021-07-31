/* global fetch */
/* eslint-disable no-console */

let token = null;

const api = {
  loginPOST(user, password) {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ user, password }), // body data type must match "Content-Type" header
    };
    return fetch('/api/v1/login', options)
      .then((response) => response.json())
      .then((json) => {
        token = json.token;
        return json;
      });
  },

  meGET() {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };
    return fetch('/api/v1/me', options)
      .then((response) => response.json())
      .then((json) => console.log(json));
  },

  isAuthentified() {
    return !!token;
  },
};

export default api;
