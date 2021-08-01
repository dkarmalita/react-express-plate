const createDataConnection = require('./users-data');

const createUsersDal = async (config) => {
  const dc = await createDataConnection(config);

  const findUserByCreds = async (user, password) => {
    const users = await dc.getUsers();
    return users
      .find((el) => el.user === user && el.password === password);
  };

  const findUserByToken = async (token) => {
    const users = await dc.getUsers();
    return users
      .find((el) => el.accessToken === token);
  };

  const createToken = async (username, password) => {
    const user = (await findUserByCreds(username, password) || {});
    return user.accessToken;
  };

  const getUserForToken = async (token) => findUserByToken(token);
  const getRoles = async () => dc.getRoles();
  const getAccessControlList = async () => dc.getAcl();

  return {
    createToken,
    getUserForToken,
    getRoles,
    getAccessControlList,
  };
};

module.exports = createUsersDal;
