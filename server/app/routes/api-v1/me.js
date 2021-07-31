function me(req, res) {
  res.json(req.user);
}

module.exports = me;
