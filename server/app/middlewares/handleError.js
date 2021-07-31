const logger = require('log4js').getLogger();
const crypto = require('crypto');
const { httpCodes } = require('../constants');

const handleError = (err, res) => {
  if (err) {
    const { statusCode, message } = err;
    /* eslint-disable no-param-reassign */
    err.errorId = crypto.randomBytes(16).toString('hex');
    err.errorTime = new Date().toLocaleString();

    logger.error(`Internal server error occurred: ${err}`);

    res.status(statusCode || httpCodes.INTERNAL_SERVER_ERROR).json({
      isError: true,
      statusCode: statusCode || httpCodes.INTERNAL_SERVER_ERROR,
      message: message || 'Something went wrong!',
      errorId: err.errorId,
      errorTime: err.errorTime,
    });
  }
};

module.exports = handleError;
