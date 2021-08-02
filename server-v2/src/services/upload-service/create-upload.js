const multer = require('multer');
const log4js = require('log4js');
const createStorage = require('./storage');

const createUpload = async (config) => {
  const logger = log4js.getLogger('[upload]');
  logger.level = config.logLevel;

  const uploadConfig = config.upload || {};

  logger.debug(JSON.stringify({ config: uploadConfig }));

  function fileFilter(req, file, cb) {
    const { mimetype } = file;

    logger.debug(JSON.stringify(file));

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    if (!(uploadConfig.mimeTypes || []).includes(mimetype)) {
      // To reject this file pass `false`, like so:
      return cb(null, false);
    }

    // To accept the file pass `true`, like so:
    return cb(null, true);

    // You can always pass an error if something goes wrong:
    // return cb(new Error('I don\'t have a clue!'));
  }

  const storage = await createStorage(config, logger);

  const upload = multer({ storage, fileFilter }).any();

  return upload;
};

module.exports = createUpload;
