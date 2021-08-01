const createAuthMiddeware = require('./auth-middleware');

const getMiddlewares = async (config, components) => ({
  authMiddleware: await createAuthMiddeware(config, components),
});

module.exports = getMiddlewares;
