const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Task = require('../models/Task');
const Project = require('../models/Project');
const ProjectsController = require('../controllers/projects');
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

let taskWithProject, taskWithLabel1, taskWithLabel2;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    const user = new User({
      _id: fakeUserId,
      email: 'user@test.pl',
      password: '123123123',
      name: 'Test User'
    });

    user.save();

    const generateProjectsAndTasks = async () => {
      // Generate user projects to leave space for only one more project (project_9)
      for (let i = 0; i < 9; i++) {
        await new Project({
          _id: generateObjectId(i),
          user: fakeUserId,
          name: `project_${i}`,
          color: `#fffaa${i}`
        }).save();
      }
      // Generate 5 tasks with project_5 to test removing project from tasks also
      for (let i = 1; i <= 5; i++) {
        await new Task({
          title: `Task ${i} to test removeProject`,
          user: fakeUserId,
          project: {
            _id: generateObjectId(1),
            name: `project_5`,
            color: '#fff'
          }
        }).save();
      }
    };

    return generateProjectsAndTasks();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('ProjectsController tests', () => {
  describe('addProject', () => {
    it('should return 400 error if user already created project same name', done => {
      const existingProject = 'project_4';
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          name: existingProject,
          color: '#fff'
        }
      };
      const res = new ResponseWithErrorsArray();
      ProjectsController.createProject(req, res).then(() => {
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
        color: '#444',
        description: 'Dummy description'
      };
      const req = {
        user: {
          id: fakeUserId
        },
        body: newProject
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
      ProjectsController.createProject(req, res).then(() => {
        const { name, color, description } = res.project;
        expect(res.statusCode).toBe(201);
        expect(name).toBe(newProject.name);
        expect(color).toBe(newProject.color);
        expect(description).toBe(newProject.description);
        done();
      });
    });

    it('should return 400 error when user reaches limit of projects', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          name: 'Some name',
          color: '#fff'
        }
      };
      const res = new ResponseWithErrorsArray();
      ProjectsController.createProject(req, res).then(() => {
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
        msg: null,
        removedProjectId: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.msg = data.msg;
          this.removedProjectId = data.removedProjectId;
        }
      };
      ProjectsController.removeProject(req, res).then(() => {
        expect(res.statusCode).toBe(200);
        expect(res.removedProjectId).toBe(generateObjectId(6));
        expect(res.msg).toBe('Project has been removed!');
        done();
      });
    });

    it('should return remove project from also from user Tasks if removed successfully', done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(1)
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
      ProjectsController.removeProject(req, res).then(updateRes => {
        expect(updateRes.nModified).toBe(5);
        done();
      });
    });
  });

  describe('updateProject', () => {
    it('should return updated project if modifed successfully', done => {
      const updatedProject = {
        name: 'project_4 updated',
        color: '#323232',
        description: 'Updated description'
      };
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          projectId: generateObjectId(4)
        },
        body: updatedProject
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
      ProjectsController.updateProjectBaseInfo(req, res).then(() => {
        expect(res.statusCode).toBe(200);
        expect(res.updatedProject).toEqual(
          expect.objectContaining({
            id: generateObjectId(4),
            ...updatedProject
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
          name: 'project_6_updated',
          color: '#323232'
        }
      };
      const res = new ResponseWithErrorsArray();
      ProjectsController.updateProjectBaseInfo(req, res).then(() => {
        expect(res.statusCode).toBe(404);
        expect(res.errors[0].msg).toBe('Project not found!');
        done();
      });
    });
  });
});
