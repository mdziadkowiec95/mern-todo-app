const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');

describe('Auth middleware function', () => {
  it('should return 401 error when token is not sent with headers', () => {
    const req = {
      headers: {}
    };

    const res = {
      statusCode: 500,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.errors = data.errors;
      }
    };

    authMiddleware(req, res, () => {});

    const { statusCode, errors } = res;
    expect(statusCode).toBe(401);
    expect(errors[0].msg).toBe('No token, authorization denied!');
  });

  it('should return user object when token is available', () => {
    const req = {
      headers: {
        'x-auth-token': 'token123'
      }
    };

    const res = {
      statusCode: 500,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.errors = data.errors;
      }
    };
    const mockJwtVerify = jest.spyOn(jwt, 'verify');
    jwt.verify = () => ({
      user: {
        id: 'id123'
      }
    });
    authMiddleware(req, res, () => {});

    mockJwtVerify.mockRestore();

    expect(req.user.id).toBe('id123');
  });
});
