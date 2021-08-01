const httpCodes = Object.freeze({
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  GONE: 410,
  DUPLICATE: 439,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
});

module.exports = httpCodes;
