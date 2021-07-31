const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  SECURITY: 'SECURITY',
  DASHBOARD: 'DASHBOARD',
  GUEST: 'GUEST',
  USER_MANAGER: 'USER MANAGER',
});

const ACL = Object.freeze({
  routes: {
    '/api/v1/me': {
      '*': ['*'],
    },
    '/api/v1/orders': {
      '*': ['*'],
    },
    '/api/v1/websocket': {
      '*': ['*'],
    },
    '/api/v1/admin/dashboard': {
      '*': [ROLES.ADMIN, ROLES.DASHBOARD],
    },
    '/api/v1/admin/update-user-status': {
      POST: [ROLES.ADMIN, ROLES.USER_MANAGER],
    },
    '/api/v1/admin/update-client-status': {
      POST: [ROLES.ADMIN, ROLES.SECURITY, ROLES.LOCATION_MANAGER],
    },
    '/api/v1/admin/location': {
      GET: ['*'],
      POST: [ROLES.ADMIN],
      PUT: [ROLES.ADMIN],
      DELETE: [ROLES.ADMIN],
    },

    '/api/v1/admin/users': {
      '*': [ROLES.ADMIN, ROLES.USER_MANAGER],
    },

    '/api/v1/admin/stats': {
      '*': [ROLES.ADMIN, ROLES.DASHBOARD],
    },
  },
});

const users = [
  {
    id: 'd7ec1e5a-09b8-438e-a707-6e78b200fb95',
    status: 'ACTIVE',
    role: 'ADMIN',
    sub: '1234567890',
    user: 'testUser@mailinator.com',
    password: 'mypass',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlciI6InRlc3RVc2VyQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.iUrFaOkViHBVH0we_UHftR7P2E1YAcqqvBZs1WwJp2Y',
  },
];

const findUserByCreds = (user, password) => users
  .find((el) => el.user === user && el.password === password);

const findUserByToken = (token) => users
  .find((el) => el.accessToken === token);

const createToken = (user, password) => (findUserByCreds(user, password) || {}).accessToken;

const getUserForToken = (token) => findUserByToken(token);

const getRoles = () => ROLES;

const getAccessControlList = () => ACL;

module.exports = {
  createToken,
  getUserForToken,
  getRoles,
  getAccessControlList,
};
