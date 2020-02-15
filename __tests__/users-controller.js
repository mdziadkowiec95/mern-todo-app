const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Task = require("../models/Task");
const UsersController = require("../controllers/users");
const { ResponseWithErrorsArray, generateObjectId } = require("./__utils");

const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
      apiKey: '124124125'
  })
);


// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

// Fake user data
const fakeUserId = "5db48b795dd65f0609cc7e72";
const fakeUserPassword = "123123123";
const salt = bcrypt.genSaltSync(10);
const fakeUserBcryptedPassword = bcrypt.hashSync(fakeUserPassword, salt);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    const user = new User({
      _id: fakeUserId,
      email: "user@test.pl",
      password: fakeUserBcryptedPassword,
      name: "Test User",
      labels: []
    });

    // Generate user labels to leave space for only one more label (label_9)
    for (let i = 0; i < 9; i++) {
      user.labels.push({
        _id: generateObjectId(i),
        name: `label_${i}`,
        color: "#fff"
      });
    }

    // Generate user projects to leave space for only one more project (project_9)
    for (let i = 0; i < 9; i++) {
      user.projects.push({
        _id: generateObjectId(i),
        name: `project_${i}`,
        color: "#fff"
      });
    }

    new Task({
      title: "Task to test removeProject",
      user: fakeUserId,
      project: {
        _id: generateObjectId(3),
        name: "project_3",
        color: "#fff"
      }
    }).save();

    return user.save();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("UserController functions", () => {
  describe("registerUser", () => {
    it("should register user correctly and return valid JWT", done => {
      const req = {
        body: {
          email: "test1@test.pl",
          password: "123123123",
          passwordConfirm: "123123123",
          name: "Another Test User"
        },
        connection: {
          encrypted: false
        },
        headers: {
          host: 'fakedomain.com'
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

      const mockJwtSign = jest.spyOn(jwt, "sign");
      jwt.sign = function() {
        const fakeToken = "token123";
        return fakeToken; 
      };

      const mockTransport = jest.spyOn(transport, 'sendMail');
      transport.sendMail = function() {
        return new Promise((resolve, reject) => {
          resolve();
        })
      }



      UsersController.registerUser(req, res).then(() => {
        const { token, statusCode } = res;

        expect(token).toBe("token123");
        expect(statusCode).toBe(200);
        mockJwtSign.mockRestore();
        mockTransport.mockRestore();
        done();
      });
    });

    it("should return errors array and 400 statusCode if user already exists", done => {
      const req = {
        body: {
          email: "test1@test.pl",
          password: "123123123",
          passwordConfirm: "123123123",
          name: "Another Test User"
        }
      };

      const res = new ResponseWithErrorsArray();

      UsersController.registerUser(req, res).then(() => {
        const { errors, statusCode } = res;
        const errorObj = {
          msg: "User with this email already exists!"
        };

        expect(errors).toContainEqual(errorObj);
        expect(statusCode).toBe(400);
        done();
      });
    });
  });

  describe("changePassword", () => {
    it("should return success msg when password is changed", done => {
      const req = {
        body: {
          oldPassword: fakeUserPassword,
          newPassword: "1231231234",
          newPasswordConfirm: "1231231234",
          name: "Another Test User"
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
        expect(msg).toBe("Password has been changed!");
        done();
      });
    });
  });
});
