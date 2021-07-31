const { authRepository } = require('../../repositories');

function login(req, res) {
  const { user, password } = req.body;
  if (user && password) {
    const token = authRepository.createToken(user, password);
    if (token) {
      res.json({ token });
      // or set httpOnly cookie
    } else {
      res.send('Incorrect Username and/or Password!');
    }
    res.end();
  } else {
    res.send('Please enter Username and Password!');
    res.end();
  }
}

module.exports = login;
