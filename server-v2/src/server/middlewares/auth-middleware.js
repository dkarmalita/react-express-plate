const log4js = require('log4js');

const createAuthMiddeware = async (config, components) => {
  const logger = log4js.getLogger('[Auth middleware]');
  logger.level = config.logLevel;

  const { users } = components;

  const authMiddleware = async (req, res, next) => {
    const { headers: { authorization }, method, originalUrl } = req;

    const token = (authorization || '').replace('Bearer ', '');

    const contextObject = { method, originalUrl, token };

    const access = await users.isRequestAllowed(contextObject);

    if (!access) {
      const message = 'Access Denied';
      logger.debug(message, JSON.stringify(contextObject));
      return res
        .status(403).json({ message });
    }

    req.user = access.user;

    logger.debug(
      JSON.stringify({
        message: 'Access Granted',
        method,
        originalUrl,
        user: access.user && access.user.user,
      }),
    );

    return next();
  };

  return authMiddleware;
};

module.exports = createAuthMiddeware;
