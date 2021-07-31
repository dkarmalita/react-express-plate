/*
  Deploy
    sls deploy
    sls deploy --noDeploy

  Open:
    https://rbpo5tghf1.execute-api.eu-central-1.amazonaws.com/dev

  Run locally:
    npm run dev

  Get log:
    https://openupthecloud.com/console-log-aws-lambda/

  Notes:
    https://www.serverless.com/blog/serverless-express-rest-api
 */
const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

process.env.NODE_CONFIG_DIR = path.join(__dirname, '../config');

const config = require('config');

const morganLogger = require('morgan');
const serverless = require('serverless-http');

// const serverless = require('serverless-http');

const log4js = require('log4js');

const handleError = require('./middlewares/handleError');
const authorizationMiddleware = require('./middlewares/authorize');

const indexRouter = require('./routes/index');
const healthCheck = require('./routes/healthcheck');
const login = require('./routes/api-v1/login');
const upload = require('./routes/api-v1/upload');
const me = require('./routes/api-v1/me');

const logger = log4js.getLogger();
logger.level = config.loggerLevel;

const app = express();
app.disable('x-powered-by');

async function run() {
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(morganLogger(config.morganLogLevel));
  // HTTP request logger middleware for node.js
  // combined | common | dev | short | tiny

  app.use(express.json());
  // The built-in middleware function of Express. It parses incoming
  // requests with JSON payloads and is based on body-parser

  app.use(express.urlencoded({ extended: false }));
  // The built-in middleware function of Express. It parses incoming
  // requests with urlencoded payloads and is based on body-parser

  // app.use(bodyParser.raw());

  app.use(cookieParser());
  // Parse Cookie header and populate req.cookies with an object keyed
  // by the cookie names.
  // Optionally you may enable signed cookie support by passing a secret
  // string, which assigns req.secret so it may be used by other middleware.

  app.use(cors(config.cors));
  // CORS is a node.js package for providing a Connect/Express middleware
  // that can be used to enable CORS with various options.

  app.use(express.static(path.join(__dirname, '../../dist')));
  // app.use(express.static(path.join(__dirname, '../public')));
  // To serve static files such as images, CSS files, and JavaScript files,
  // use the express.static built-in middleware function in Express.

  // app.use(prepareClients);
  // createDynamoDBMiddleware :: Initialize DynamoDB, Cognito, i18n, etc

  app.use('/', indexRouter);
  app.use('/healthcheck', healthCheck);

  app.post('/api/v1/login', login);

  app.post('/api/upload', upload);

  app.use('/api/v1', authorizationMiddleware); // -------- protected routes

  app.use('/api/v1/me', me);

  // if (!isProd()) {
  //     const swaggerSpec = swaggerJSDoc(options);
  //     app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // }

  app.use((err, req, res, next) => {
    handleError(err, res);
    next(err);
  });

  if (process.env.NODE_ENV === 'development') {
    const server = app.listen(config.port, () => {
      const { port } = server.address();
      logger.info(`app is running at port ${port}`);
    });
    module.exports = app;
  } else {
    // Running on Lambda env
    module.exports.handler = serverless(app);
  }
}

run().catch((error) => {
  logger.error('ERROR', error);
});
