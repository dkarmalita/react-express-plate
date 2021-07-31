// console.log('[CONFIG]', 'default');
const path = require('path');

module.exports = {
  loggerLevel: 'debug', // "debug" || "info",
  morganLogLevel: 'dev',
  port: 8081,
  uploadsFolder: path.join(__dirname, '../uploads'),
  uploadMimeTypes: ['image/png'],
  cors: {
    credentials: true,
    origin: [/\.spoedtestcorona\.nl$/, /127\.0\.0\.1:\d{4}$/, /localhost:\d{4}$/],
  },
};
