const path = require('path');
const multer = require('multer');

const createStorage = async (config, logger) => {
  const uploadConfig = config.upload || {};

  // Disk storage ------------------------
  const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadConfig.path);
    },
    filename(req, file, cb) {
      const { originalname, mimetype } = file;
      const targetName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
      logger.info(JSON.stringify({ originalname, mimetype, targetName }));
      cb(null, targetName);
    },
  });

  // Memory storage (ALT) -----------------
  const memStorage = multer.memoryStorage();

  // S3 storage: For s3 storage, add  multer-s3
  // Also, note the binaryMediaTypes, which may become trouble, here
  // https://cloudstack.ninja/springsomfan/serverless-framework-express-js-uploading-images-turns-out-corrupt-broken/

  return uploadConfig.path ? diskStorage : memStorage;
};

module.exports = createStorage;
