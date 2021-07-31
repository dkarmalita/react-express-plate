// const config = require('config');
const logger = require('log4js').getLogger('[Auth middleware]');

const { httpCodes, userStatuses } = require('../constants');

// const {
//  logApiAccessGrantedAction,
//  logApiAccessRejectedAction,
// } = require('../services/userActionService');

const { authRepository } = require('../repositories');

// const { region, cognito } = config;
const sendForbiddenResponse = (res, message) => res.status(httpCodes.FORBIDDEN).send({
  statusCode: httpCodes.FORBIDDEN,
  message,
});

const logAccessInfo = (access, method, url, user) => {
  const { role, username } = user;
  const status = access ? 'GRANTED' : 'DENIED';
  const message = `${method} ${url} -- ${status} -- [${role}] ${username}`;

  logger.info(message);
};

const isRequestAllowed = (user, method, originalUrl) => {
  const { routes } = authRepository.getAccessControlList();

  // if (originalUrl.match(`/api/v1/admin/users/${user.id}`)) {
  //   return true;
  // }

  return Object.entries(routes).some(([route, value]) => {
    if (originalUrl.match(route)) {
      const roles = value[method] || value['*'] || [];
      return roles.includes(user.role) || roles.includes('*');
    }

    return false;
  });
};

const getUserByAuthorizationHeader = async (req) => {
  try {
    const { headers: { authorization } } = req;

    if (!authorization) {
      return null;
    }

    const token = authorization.replace('Bearer ', '');

    const user = authRepository.getUserForToken(token);

    if (!user.status) {
      return null;
    }

    return user;
  } catch (error) {
    logger.error(`Authorization header error: ${error.message}`);
    return null;
  }
};

/**
 * This middleware should check the existence and content of the Bearer token and send
 * the forbidden result for any forbidden requests or call the next middleware if the
 * request is allowed.
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
const authorizationMiddleware = async (req, res, next) => {
  const { method, originalUrl } = req;
  const user = await getUserByAuthorizationHeader(req);

  if (!user) {
    // await logApiAccessRejectedAction(req);
    return sendForbiddenResponse(res, 'Access Denied');
  }

  if (user.userStatus === userStatuses.INACTIVE) {
    // await logApiAccessRejectedAction(req);
    logAccessInfo(false, method, originalUrl, user);
    return sendForbiddenResponse(res, 'Disabled');
  }

  const access = isRequestAllowed(user, method, originalUrl);

  logAccessInfo(access, method, originalUrl, user);

  if (!access) {
    // await logApiAccessRejectedAction(req);
    return sendForbiddenResponse(res, 'Access Denied');
  }

  req.user = user;

  // await logApiAccessGrantedAction(req);

  return next();
};

module.exports = authorizationMiddleware;
