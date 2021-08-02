import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import api from './api';

/* eslint-disable no-console */

const Field = React.forwardRef(({ label, type, initialValue }, ref) => {
  useEffect(() => { // componentDidMount
    if (initialValue) {
      // eslint-disable-next-line no-param-reassign
      ref.current.value = initialValue;
    }
  }, []);
  return (
    <div>
      <label className="label" htmlFor={label}>{label}</label>
      <input className="input" id={label} ref={ref} type={type} />
    </div>
  );
});

Field.propTypes = {
  initialValue: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};

Field.defaultProps = {
  initialValue: null,
  label: null,
  type: 'text',
};

const Form = ({ onSubmit, config }) => {
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
      <Field ref={usernameRef} initialValue={config.defaultUser} label="Username:" type="text" />
      <Field ref={passwordRef} initialValue={config.defaultPassword} label="Password:" type="password" />
      <div>
        <button className="submit-btn" type="submit">Submit</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  config: {},
  onSubmit: null,
};

const LoginForm = ({ config }) => {
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
      <Form onSubmit={handleSubmit} config={config} />
    </div>
  );
};

LoginForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  config: PropTypes.object,
};

LoginForm.defaultProps = {
  config: {},
};

export default LoginForm;
