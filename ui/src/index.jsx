import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/* global document */
/* eslint-disable no-console */

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    console.log('Accepting the updated app module!');
    renderApp();
  });
}
