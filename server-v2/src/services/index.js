const createHealthcheck = require('./healthcheck-service');
const createUpload = require('./upload-service');
const createUsers = require('./users-service');

const createComponents = async (config, dal) => {
  const components = {};

  components.healthcheck = await createHealthcheck(config, dal, components);
  components.upload = await createUpload(config, dal, components);
  components.users = await createUsers(config, dal, components);

  return components;
};

module.exports = createComponents;
