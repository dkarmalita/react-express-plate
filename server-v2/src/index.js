const { getLogger } = require('log4js');

const getConfig = require('./config');
const createDal = require('./dal');
const createComponents = require('./services');
const createServer = require('./server');

const logger = getLogger();

const run = async () => {
  const config = await getConfig();

  const dal = await createDal(config);

  const components = await createComponents(config, dal);

  const server = await createServer(config, components);

  return server.run();
};

run().catch((error) => {
  logger.error('ERROR', error);
});
