const path = require('path');
const router = require('express').Router();
const multer = require('multer');

const config = require('config');

const { uploadsFolder, uploadMimeTypes } = config;

/* eslint-disable no-console, no-unused-vars, no-unreachable */

// Disk storage ------------------------
const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsFolder);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Memory storage (ALT) -----------------
const memStorage = multer.memoryStorage();

// S3 storage: For s3 storage, add  multer-s3
// Also, note the binaryMediaTypes, which may become trouble, here
// https://cloudstack.ninja/springsomfan/serverless-framework-express-js-uploading-images-turns-out-corrupt-broken/

function fileFilter(req, file, cb) {
  const { mimetype } = file;
  console.log('MEMTYPE', mimetype);

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  if (!uploadMimeTypes.includes) {
    // To reject this file pass `false`, like so:
    return cb(null, false);
  }

  // To accept the file pass `true`, like so:
  return cb(null, true);

  // You can always pass an error if something goes wrong:
  return cb(new Error('I don\'t have a clue!'));
}

const upload = multer({
  storage: uploadsFolder ? diskStorage : memStorage,
  fileFilter,
}).single('avatar');

router.post('*', upload, (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    return res.sendStatus(200);
  }

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  return res.status(400).send('Unacceptable myme type!');
});

// Advansed error handling - working example
// =========================================
// router.post('*', (req, res, next) => {
//   console.log(req.file)
//   upload(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       // Случилась ошибка Multer при загрузке.
//       console.log(err);
//       return res.sendStatus(400);
//     }

//     if (err) {
//       console.log(err);
//       return res.sendStatus(500);
//     // При загрузке произошла неизвестная ошибка.
//     }

//     console.log('Success');
//     return res.sendStatus(200);
//     // Все прекрасно загрузилось.
//   });
// });

module.exports = router;
