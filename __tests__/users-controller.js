const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');
const UsersController = require('../controllers/users');
const { ResponseWithErrorsArray, generateObjectId } = require('./__utils');

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
      name: 'Test User',
      labels: []
    });

    // Generate user labels to leave space for only one more label (label_9)
    for (let i = 0; i < 9; i++) {
      user.labels.push({
        _id: generateObjectId(i),
        name: `label_${i}`,
        color: '#fff'
      });
    }

    // Generate user projects to leave space for only one more project (project_9)
    for (let i = 0; i < 9; i++) {
      user.projects.push({
        _id: generateObjectId(i),
        name: `project_${i}`,
        color: '#fff'
      });
    }

    new Task({
      title: 'Task to test removeProject',
      user: fakeUserId,
      project: {
        _id: generateObjectId(3),
        name: 'project_3',
        color: '#fff'
      }
    }).save();

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

      const res = new ResponseWithErrorsArray();

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

  /** --------- User labels tests --------- */
  describe('addLabel', () => {
    it('should return error if user label with same name already exists', done => {
      const existingLabel = 'label_8';
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          label: {
            name: existingLabel,
            color: '#fff'
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      UsersController.addLabel(req, res).then(() => {
        expect(res.errors[0].msg).toBe(
          `Label '${existingLabel}' already exist!`
        );
        done();
      });
    });

    it('should return new label object if added with success', done => {
      const newLabel = {
        name: 'label_9',
        color: '#fff'
      };
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          label: newLabel
        }
      };

      const res = {
        statusCode: 500,
        labels: [],
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.labels = data;
        }
      };

      UsersController.addLabel(req, res).then(() => {
        const label = res.labels.find(label => label.name === newLabel.name);

        expect(label.name).toBe(newLabel.name);
        expect(label.color).toBe(newLabel.color);
        done();
      });
    });

    it('should return error when user reaches limit of labels', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          label: {
            name: 'Test label name',
            color: '#fff'
          }
        }
      };

      const res = {
        statusCode: 500,
        errors: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.errors = data.errors;
        }
      };

      UsersController.addLabel(req, res).then(() => {
        expect(res.errors[0].msg).toBe('You can create up to 10 labels!');
        done();
      });
    });
  });

  describe('removeLabel', () => {
    it('should return labels except removed label', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          labelId: generateObjectId(5)
        }
      };

      const res = {
        statusCode: 500,
        userLabels: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.userLabels = data.userLabels;
        }
      };

      UsersController.removeLabel(req, res).then(() => {
        const removedIndex = res.userLabels.findIndex(
          label => label._id === req.params.labelId
        );
        expect(removedIndex).toBe(-1);
        done();
      });
    });
  });

  describe('updateLabel', () => {
    it('should return 400 error if labelId not provided', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {},
        body: {
          label: {
            name: 'updated label',
            color: '#323232'
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      UsersController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(400);
        expect(res.errors[0].msg).toBe(
          'You need to pass label ID to delete it!'
        );
        done();
      });
    });

    it('should return 404 error if label with provided ID does not exists', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          labelId: generateObjectId(5)
        },
        body: {
          label: {
            name: 'updated label',
            color: '#323232'
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      UsersController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(404);
        expect(res.errors[0].msg).toBe('Label not found!');
        done();
      });
    });

    it('should return modified label if updated successfully', done => {
      const modifiedLabel = {
        name: 'UPDATED label',
        color: '#555'
      };
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          labelId: generateObjectId(3)
        },
        body: {
          label: modifiedLabel
        }
      };

      const res = {
        statusCode: 500,
        label: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.label = data;
        }
      };

      UsersController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(200);
        expect(res.label).toEqual(expect.objectContaining(modifiedLabel));
        done();
      });
    });
  });

  /** --------- User projects tests --------- */
  describe('addProject', () => {
    it('should return 400 error if user already created project same name', done => {
      const existingProject = 'project_4';
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          project: {
            name: existingProject,
            color: '#fff'
          }
        }
      };
      const res = new ResponseWithErrorsArray();

      UsersController.addProject(req, res).then(() => {
        expect(res.statusCode).toBe(400);
        expect(res.errors[0].msg).toBe(
          `Project '${existingProject}' already exist!`
        );
        done();
      });
    });
    it('should return created project if added with success', done => {
      const newProject = {
        name: 'project_9',
        color: '#444'
      };
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          project: newProject
        }
      };
      const res = {
        statusCode: 500,
        project: null,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.project = data;
        }
      };
      UsersController.addProject(req, res).then(() => {
        const { name, color } = res.project;
        expect(name).toBe(newProject.name);
        expect(color).toBe(newProject.color);
        done();
      });
    });

    it('should return 400 error when user reaches limit of projects', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          project: {
            name: 'Test project name',
            color: '#ffddee'
          }
        }
      };
      const res = new ResponseWithErrorsArray();

      UsersController.addProject(req, res).then(() => {
        expect(res.statusCode).toBe(400);
        expect(res.errors[0].msg).toBe('You can create up to 10 projects!');
        done();
      });
    });
  });

  describe('removeProject', () => {
    it('should return removed project ID if removed successfully', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(6)
        }
      };
      const res = {
        statusCode: 500,
        removedProjectId: null,
        userProjects: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.removedProjectId = data.removedProjectId;
          this.userProjects = data.userProjects;
        }
      };

      UsersController.removeProject(req, res).then(() => {
        expect(res.removedProjectId).toBe(generateObjectId(6));
        expect(
          res.userProjects.findIndex(p => p.id === generateObjectId(6))
        ).toBe(-1);

        done();
      });
    });

    it('should return remove project from also from user Tasks if removed successfully', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(3)
        }
      };
      const res = {
        statusCode: 500,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {}
      };

      UsersController.removeProject(req, res).then(userTasks => {
        const isAnyTaskWithProject3 = userTasks.some(task =>
          task.project._id
            ? task.project._id.toString() === generateObjectId(4)
            : false
        );
        expect(isAnyTaskWithProject3).toBe(false);

        done();
      });
    });
  });

  describe('updateProject', () => {
    it('should return updated project if modifed successfully', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(4)
        },
        body: {
          project: {
            name: 'project_4',
            color: '#323232'
          }
        }
      };
      const res = {
        statusCode: 500,
        updatedProject: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.updatedProject = data;
        }
      };

      UsersController.updateProject(req, res).then(() => {
        expect(res.statusCode).toBe(200);
        expect(res.updatedProject).toEqual(
          expect.objectContaining({
            id: generateObjectId(4),
            name: req.body.project.name,
            color: req.body.project.color
          })
        );
        done();
      });
    });

    it('should return updated project if modifed successfully', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(6)
        },
        body: {
          project: {
            name: 'project_6_updated',
            color: '#323232'
          }
        }
      };
      const res = new ResponseWithErrorsArray();

      UsersController.updateProject(req, res).then(() => {
        expect(res.statusCode).toBe(404);
        expect(res.errors[0].msg).toBe('Project not found!');
        done();
      });
    });
  });
});
