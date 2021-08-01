const express = require('express');

const getRouter = async (config, components) => {
  const {
    healthcheck,
    upload,
    users,
  } = components;

  const router = express.Router();

  /* GET home page. */
  router.get('/', (_, res) => {
    res.render(
      'index',
      {
        title: config.title,
        message: config.title,
      },
    );
  });

  router.get('/healthcheck', async (req, res) => {
    const healthcheckData = await healthcheck();
    return res.json(healthcheckData);
  });

  router.post('/api/v1/login', async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password) {
      return res.status(400)
        .send('Please enter Username and Password!');
    }

    const loginData = await users.login(user, password);
    if (!loginData) {
      return res.status(400)
        .send('Incorrect Username and/or Password!');
    }

    return res.json(loginData);
  });

  /* eslint-disable-next-line no-unused-vars */
  router.post('/api/upload', upload, (req, res, next) => {
    if (req.files && req.files.length) {
      return res.sendStatus(200);
    }

    return res.status(400).send('Unacceptable myme type!');
  });

  // Multer Advansed error handling - working example
  // =========================================
  // router.post('*', (req, res, next) => {
  //   console.log(req.file)
  //   upload(req, res, (err) => {
  //     if (err instanceof multer.MulterError) {
  //       // Случилась ошибка Multer при загрузке.
  //       console.log(err);
  //       return res.sendStatus(400);
  //     }
  //
  //     if (err) {
  //       console.log(err);
  //       return res.sendStatus(500);
  //     // При загрузке произошла неизвестная ошибка.
  //     }
  //
  //     console.log('Success');
  //     return res.sendStatus(200);
  //     // Все прекрасно загрузилось.
  //   });
  // });

  // ---------- protected routes -----------

  router.get('/api/v1/me', async (req, res) => res.json(req.user));

  return router;
};

module.exports = getRouter;
