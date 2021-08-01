const createHealthcheck = require('./healthcheck');
const createUpload = require('./upload');
const createUsers = require('./users');

const createComponents = async (config, dal) => {
  const components = {};

  components.healthcheck = await createHealthcheck(config, dal, components);
  components.upload = await createUpload(config, dal, components);
  components.users = await createUsers(config, dal, components);

  return components;
};

module.exports = createComponents;
