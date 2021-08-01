const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const morganLogger = require('morgan');
// const serverless = require('serverless-http');

const log4js = require('log4js');

const getRouter = require('./router');
const getMiddlewares = require('./middlewares');

async function createServer(config, components) {
  const logger = log4js.getLogger(config.title);
  logger.level = config.logLevel;

  const router = await getRouter(config, components);
  const middlewares = await getMiddlewares(config, components);

  const app = express();
  app.disable('x-powered-by');

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

  app.use(express.static(config.static.path));
  // To serve static files such as images, CSS files, and JavaScript files,
  // use the express.static built-in middleware function in Express.

  // app.use(prepareClients);
  // createDynamoDBMiddleware :: Initialize DynamoDB, Cognito, i18n, etc

  app.use(middlewares.authMiddleware);

  app.use('/', router);

  // if (!isProd()) {
  //     const swaggerSpec = swaggerJSDoc(options);
  //     app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // }

  app.use((err, req, res, next) => {
    middlewares.errorMiddeware(err, res);
    next(err);
  });

  const run = () => {
    const server = app.listen(config.port, () => {
      const { port } = server.address();
      logger.info(`APP is running at port ${port}`);
    });
    return server;
  };

  return { run };
}

module.exports = createServer;
