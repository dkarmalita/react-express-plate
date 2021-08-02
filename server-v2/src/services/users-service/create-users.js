const createUsers = async (config, dal) => {
  const { usersDal } = dal;

  const login = async (user, password) => {
    const token = await usersDal
      .createToken(user, password);
    return token ? { token } : null;
  };

  const { getUserForToken } = usersDal;

  const isRequestAllowed = async (contextObject) => {
    const { method, originalUrl, token } = contextObject;

    const { routes } = await usersDal.getAccessControlList();

    const isOpenRoute = !Object.keys(routes).includes(originalUrl);
    if (isOpenRoute) { return {}; }

    const user = await usersDal.getUserForToken(token);

    if (!user) { return false; }

    const requestAllowed = Object.entries(routes).some(([route, value]) => {
      if (originalUrl.match(route)) {
        const roles = value[method] || value['*'] || [];
        return roles.includes(user.role) || roles.includes('*');
      }
      return false;
    });

    if (requestAllowed) {
      return { user };
    }
    return false;
  };

  return {
    login,
    getUserForToken,
    isRequestAllowed,
  };
};

module.exports = createUsers;
