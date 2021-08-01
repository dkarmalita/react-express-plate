const createUsersDal = require('./users-dal');

const createDal = async (config) => {
  const dal = {
    usersDal: await createUsersDal(config),
  };
  return dal;
};

module.exports = createDal;
