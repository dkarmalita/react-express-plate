// console.log('[CONFIG]', 'development');

module.exports = {
  uploadsFolder: false,
  cors: {
    credentials: true,
    origin: [/\.spoedtestcorona\.nl$/, /127\.0\.0\.1:\d{4}$/, /localhost:\d{4}$/],
  },
};
