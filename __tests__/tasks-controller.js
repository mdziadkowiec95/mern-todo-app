const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Task = require('../models/Task');
const TasksController = require('../controllers/tasks');
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
const testUserId = '5db48b795dd65f0609cc7e72';
const testUserPasswordDecoded = '123123123';

let testUser;
const testUserFirstTaskId = generateObjectId(3);

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    testUser = new User({
      _id: testUserId,
      email: 'user@test.pl',
      password: testUserPasswordDecoded,
      name: 'Test User'
    });

    // Add first task for user to test updating task later
    new Task({
      _id: testUserFirstTaskId,
      user: testUserId,
      title: 'First task title'
    }).save();

    return testUser.save();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('TasksController functions tests', () => {
  describe('createOrUpdateTask', () => {
    it('should return updated task if it has existed already', done => {
      const req = {
        user: {
          id: testUser.id
        },
        body: {
          taskId: testUserFirstTaskId,
          title: 'First task title UPDATED'
        }
      };

      const res = {
        statusCode: 500,
        task: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.task = data;
        }
      };

      TasksController.createOrUpdateTask(req, res).then(() => {
        expect(res.task.title).toBe('First task title UPDATED');
        done();
      });
    });

    it('should return new task if it has not existed before', done => {
      const req = {
        user: {
          id: testUser.id
        },
        body: {
          title: 'Second task title'
        }
      };

      const res = {
        statusCode: 500,
        task: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.task = data;
        }
      };

      TasksController.createOrUpdateTask(req, res).then(() => {
        expect(res.task.title).toBe('Second task title');
        done();
      });
    });
  });

  describe('searchTask', () => {
    it('should return not empty array if any task matches the query', done => {
      const req = {
        user: {
          id: testUser.id
        },
        query: {
          searchQuery: 'task'
        }
      };

      const res = {
        statusCode: 500,
        tasks: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.tasks = data;
        }
      };

      TasksController.searchTask(req, res).then(() => {
        expect(Array.isArray(res.tasks)).toBe(true);
        expect(res.tasks.length).toBeTruthy();
        done();
      });
    });

    it('should return tasks which titles match the query', done => {
      const req = {
        user: {
          id: testUser.id
        },
        query: {
          searchQuery: 'UPDATED'
        }
      };

      const res = {
        statusCode: 500,
        tasks: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.tasks = data;
        }
      };

      TasksController.searchTask(req, res).then(() => {
        const allTitlesIncludeQuery = res.tasks.every(task =>
          task.title.includes(req.query.searchQuery)
        );
        expect(allTitlesIncludeQuery).toBe(true);
        done();
      });
    });

    it('should return error if title query not provided', done => {
      const req = {
        query: {}
      };

      const res = new ResponseWithErrorsArray();

      TasksController.searchTask(req, res).then(() => {
        expect(res.errors[0].msg).toBe('You have not provided any title!');
        done();
      });
    });

    it('should return error if no tasks found', done => {
      const req = {
        user: {
          id: testUser.id
        },
        query: {
          searchQuery: 'some task title'
        }
      };

      const res = new ResponseWithErrorsArray();

      TasksController.searchTask(req, res).then(() => {
        expect(res.errors[0].msg).toBe('No tasks found!');
        done();
      });
    });
  });

  describe('deleteTask', () => {
    it('should return 404 error if task with ID does not exists', done => {
      const req = {
        user: {
          id: testUser.id
        },
        params: {
          taskId: generateObjectId(7)
        }
      };

      const res = new ResponseWithErrorsArray();

      TasksController.deleteTask(req, res).then(() => {
        expect(res.statusCode).toBe(404);
        expect(res.errors[0].msg).toBe('Task not found!');
        done();
      });
    });

    it('should return 401 error if user is not owner of the task', done => {
      const req = {
        user: {
          id: generateObjectId(6)
        },
        params: {
          taskId: testUserFirstTaskId
        }
      };

      const res = new ResponseWithErrorsArray();

      TasksController.deleteTask(req, res).then(() => {
        expect(res.statusCode).toBe(401);
        expect(res.errors[0].msg).toBe(
          'You are NOT authorized to delete this task!'
        );
        done();
      });
    });

    it('should return proper message if task is deleted with success', done => {
      const req = {
        user: {
          id: testUser.id
        },
        params: {
          taskId: testUserFirstTaskId
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

      TasksController.deleteTask(req, res)
        .then(() => Task.findById(testUserFirstTaskId))
        .then(deletedTask => {
          expect(deletedTask).toBeFalsy();
          expect(res.statusCode).toBe(200);
          expect(res.msg).toBe('Task has been removed!');
          done();
        });
    });

    it('should return 400 error if taskId param is not provided', done => {
      const req = {
        user: {
          id: testUser.id
        },
        params: {}
      };
      const res = new ResponseWithErrorsArray();

      TasksController.deleteTask(req, res).then(() => {
        expect(res.statusCode).toBe(400);
        expect(res.errors[0].msg).toBe(
          'You need to pass task ID to delete it!'
        );
        done();
      });
    });
  });
});
