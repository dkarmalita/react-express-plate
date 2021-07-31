import React from 'react';
import PropTypes from 'prop-types';

import api from './api';

/* eslint-disable no-console */

const Field = React.forwardRef(({ label, type }, ref) => (
  <div>
    <label className="label" htmlFor={label}>{label}</label>
    <input className="input" id={label} ref={ref} type={type} />
  </div>
));

Field.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};

Field.defaultProps = {
  label: null,
  type: 'text',
};

const Form = ({ onSubmit }) => {
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    onSubmit(data);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="Username:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button className="submit-btn" type="submit">Submit</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: null,
};

const LoginForm = () => {
  const handleSubmit = ({ username, password }) => {
    if (api.isAuthentified()) {
      console.log('ALREADY AUTHENTIFICATED');
    }
    console.log({ username, password });
    api.loginPOST(username, password)
      .then((authData) => {
        console.log(authData);
      })
      .then(() => {
        api.meGET().then(console.log);
      });
  };
  return (
    <div className="app">
      <Form onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginForm;
