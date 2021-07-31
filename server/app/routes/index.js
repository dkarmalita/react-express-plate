const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (_, res) => {
  res.render('index', { title: 'Express', message: 'API' });
});

module.exports = router;
