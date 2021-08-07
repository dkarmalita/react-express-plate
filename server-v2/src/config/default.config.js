const path = require('path');

module.exports = {
  title: 'Example API',
  logLevel: 'info', // 'debug' || 'info'
  descriptionPath: path.join(__dirname, '../../DESCRIPTION.md'),
  morganLogLevel: 'tiny',
  port: 8081,
  cors: {
    credentials: true,
    origin: [/127\.0\.0\.1:\d{4}$/, /localhost:\d{4}$/],
  },
  static: {
    path: path.join(__dirname, '../../public'),
  },
  upload: {
    path: path.join(__dirname, '../../upload'),
    mimeTypes: ['image/png'],
  },
};
