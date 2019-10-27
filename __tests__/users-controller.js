const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const config = require('config');
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

const fakeUserId = '5db48b795dd65f0609cc7e72';

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    const user = new User({
      _id: fakeUserId,
      email: 'user@test.pl',
      password: '123123123',
      passwordConfirm: '123123123',
      name: 'Test User'
    });

    const savedUser = user.save();

    return savedUser;
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('UserController tests', () => {
  it('Register user correctly and returns valid JWT', done => {
    const req = {
      body: {
        email: 'anotheruser@test.pl',
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

    UsersController.registerUser(req, res).then(() => {
      const { token, statusCode } = res;
      const decodedJwt = jwt.verify(token, config.get('mySecretJwt'));

      expect(decodedJwt.hasOwnProperty('user')).toBe(true);
      expect(statusCode).toBe(200);

      done();
    });
  });
});
