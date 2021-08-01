const createAuthMiddeware = require('./auth-middleware');
const createErrorMiddeware = require('./auth-middleware');

const getMiddlewares = async (config, components) => ({
  authMiddleware: await createAuthMiddeware(config, components),
  errorMiddeware: await createErrorMiddeware(config, components),
});

module.exports = getMiddlewares;
