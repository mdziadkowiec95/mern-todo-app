const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AuthController = require("../controllers/auth");
const { ResponseWithErrorsArray, generateObjectId } = require("./__utils");
// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Fake user data
const testUserId = "5db48b795dd65f0609cc7e72";
const testUserPasswordDecoded = "123123123";
const salt = bcrypt.genSaltSync(10);
const testUserPasswordEncoded = bcrypt.hashSync(testUserPasswordDecoded, salt);

let testUser;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    testUser = new User({
      _id: testUserId,
      email: "user@test.pl",
      password: testUserPasswordEncoded,
      name: "Test User"
    });

    return testUser.save();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("AuthController function tests", () => {
  describe("authUser", () => {
    it("should return created User object when user ID decoded from JWT", done => {
      const req = {
        user: {
          id: testUser.id
        }
      };
      const res = {
        statusCode: 500,
        user: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.user = data;
        }
      };

      AuthController.authUser(req, res).then(() => {
        expect(res.user).toEqual(
          expect.objectContaining({
            id: testUser.id,
            email: "user@test.pl",
            name: "Test User"
          })
        );
        done();
      });
    });
  });

  describe("signIn", () => {
    it("should return error if user does NOT exists", done => {
      const req = {
        body: {
          email: "not_existing_user@test.pl",
          password: testUser.password
        }
      };
      const res = new ResponseWithErrorsArray();

      AuthController.signIn(req, res).then(() => {
        expect(res.errors[0].msg).toBe("User not found!");
        done();
      });
    });

    it("should return error when invalid credentials", done => {
      const req = {
        body: {
          email: testUser.email,
          password: "wrongPassword"
        }
      };
      const res = new ResponseWithErrorsArray();

      AuthController.signIn(req, res).then(() => {
        expect(res.errors[0].msg).toBe("Please, enter correct credientials!");
        done();
      });
    });

    // Don't now yet how to return promise from callback inside jwt.sign()

    // it('should return JWT token if signed in successfully', done => {
    //   const req = {
    //     body: {
    //       email: testUser.email,
    //       password: testUserPasswordDecoded
    //     }
    //   };
    //   const res = {
    //     statusCode: 500,
    //     token: null,
    //     status: function(code) {
    //       this.statusCode = code;
    //       return this;
    //     },
    //     json: function(data) {
    //       this.token = data.token;
    //     }
    //   };

    //   const mockJwtSign = jest.spyOn(jwt, 'sign');
    //   jwt.sign = function() {
    //     const fakeToken = 'token123';
    //     return fakeToken;
    //   };

    //   AuthController.signIn(req, res).then(() => {
    //     expect(res.token).toBe('token123');
    //     mockJwtSign.mockRestore();
    //     done();
    //   });
    // });
  });
});
