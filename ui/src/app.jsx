import React from 'react';
import './scss/index.scss';
import LoginForm from './login-form';
import config from './config';

/* eslint-disable no-console */
/* global document, fetch */

if (process.env.NODE_ENV === 'production') {
  // Code will only appear in production build.
}

if (process.env.NODE_ENV !== 'production') {
  // Code will be removed from production build.
  console.log("Looks like you're a developer.");
}

// Will be proxy to https://jsonplaceholder.typicode.com
// see webpack.config.js
fetch('/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

const App = () => {
  console.log('RENDER APP', new Date());
  console.log(config.title);
  document.title = config.title;

  return <LoginForm />;
};

export default App;
