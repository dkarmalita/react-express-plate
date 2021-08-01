const { getLogger } = require('log4js');

const createDal = require('./dal');
const createComponents = require('./components');
const createServer = require('./server');

const getConfig = require('./config');

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
