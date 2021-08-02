const statuses = Object.freeze({
  OK: 'OK',
  ERROR: 'ERROR',
});

const createHealthcheck = async (config) => () => ({
  title: config.title,
  status: statuses.OK,
  timestamp: Date.now(),
});

module.exports = createHealthcheck;
