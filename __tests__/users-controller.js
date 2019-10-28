const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UsersController = require('../controllers/users');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Fake user data
const fakeUserId = '5db48b795dd65f0609cc7e72';
const fakeUserPassword = '123123123';
const salt = bcrypt.genSaltSync(10);
const fakeUserBcryptedPassword = bcrypt.hashSync(fakeUserPassword, salt);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    const user = new User({
      _id: fakeUserId,
      email: 'user@test.pl',
      password: fakeUserBcryptedPassword,
      name: 'Test User'
    });

    return user.save();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('UserController functions', () => {
  describe('registerUser', () => {
    it('should register user correctly and return valid JWT', done => {
      const req = {
        body: {
          email: 'test1@test.pl',
          password: '123123123',
          passwordConfirm: '123123123',
          name: 'Another Test User'
        }
      };

      const res = {
        statusCode: 500,
        token: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.token = data.token;
        }
      };

      const mockJwtSign = jest.spyOn(jwt, 'sign');
      jwt.sign = function() {
        const fakeToken = 'token123';
        return fakeToken;
      };

      UsersController.registerUser(req, res).then(() => {
        const { token, statusCode } = res;

        expect(token).toBe('token123');
        expect(statusCode).toBe(200);
        mockJwtSign.mockRestore();
        done();
      });
    });

    it('should return errors array and 400 statusCode if user already exists', done => {
      const req = {
        body: {
          email: 'test1@test.pl',
          password: '123123123',
          passwordConfirm: '123123123',
          name: 'Another Test User'
        }
      };

      const res = {
        statusCode: 500,
        errors: [],
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.errors = data.errors;
        }
      };

      UsersController.registerUser(req, res).then(() => {
        const { errors, statusCode } = res;
        const errorObj = {
          msg: 'User with this email already exists!'
        };

        expect(errors).toContainEqual(errorObj);
        expect(statusCode).toBe(400);
        done();
      });
    });
  });

  describe('changePassword', () => {
    it('should return success msg when password is changed', done => {
      const req = {
        body: {
          oldPassword: fakeUserPassword,
          newPassword: '1231231234',
          newPasswordConfirm: '1231231234',
          name: 'Another Test User'
        },
        user: {
          id: fakeUserId
        }
      };

      const res = {
        statusCode: 500,
        msg: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.msg = data.msg;
        }
      };

      UsersController.changePassword(req, res).then(() => {
        const { msg, statusCode } = res;

        expect(statusCode).toBe(200);
        expect(msg).toBe('Password has been changed!');
        done();
      });
    });
  });
});
