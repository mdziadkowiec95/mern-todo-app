const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/User");
const Task = require("../models/Task");
const Preferences = require("../models/Preferences");
const PreferencesController = require("../controllers/preferences");
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
const fakeUserId = "5db48b795dd65f0609cc7e72";

let taskWithProject, taskWithLabel1, taskWithLabel2;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);

    const user = new User({
      _id: fakeUserId,
      email: "user@test.pl",
      password: "123123123",
      name: "Test User"
    });

    user.save();

    const userPreferences = new Preferences({
      user: fakeUserId
    });

    // Generate user labels to leave space for only one more label (label_9)
    for (let i = 0; i < 9; i++) {
      userPreferences.labels.push({
        _id: generateObjectId(i),
        name: `label_${i}`,
        color: "#fff"
      });
    }

    // Generate user projects to leave space for only one more project (project_9)
    for (let i = 0; i < 9; i++) {
      userPreferences.projects.push({
        _id: generateObjectId(i),
        name: `project_${i}`,
        color: "#fff"
      });
    }

    taskWithProject = new Task({
      title: "Task to test removeProject",
      user: fakeUserId,
      project: {
        _id: generateObjectId(3),
        name: "project_3",
        color: "#fff"
      }
    });

    taskWithLabel1 = new Task({
      title: "1 Task to test remove labels",
      user: fakeUserId,
      labels: [
        {
          _id: generateObjectId(1),
          name: "label_1",
          color: "#fff"
        }
      ]
    });

    taskWithLabel2 = new Task({
      title: "2 Task to test remove labels",
      user: fakeUserId,
      labels: [
        {
          _id: generateObjectId(1),
          name: "label_1",
          color: "#fff"
        },
        {
          _id: generateObjectId(2),
          name: "label_2",
          color: "#fff"
        }
      ]
    });
    taskWithProject.save();
    taskWithLabel1.save();
    taskWithLabel2.save();
    console.log(taskWithLabel1, taskWithLabel2);
    // console.log(user);
    console.log(userPreferences);

    return userPreferences.save();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("PreferencesController functions", () => {
  /** --------- User labels tests --------- */
  describe("addLabel", () => {
    it("should return error if user label with same name already exists", done => {
      const existingLabel = "label_8";
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          label: {
            name: existingLabel,
            color: "#fff"
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      PreferencesController.addLabel(req, res).then(() => {
        expect(res.errors[0].msg).toBe(
          `Label '${existingLabel}' already exist!`
        );
        done();
      });
    });

    it("should return new label object if added with success", done => {
      const newLabel = {
        name: "label_9",
        color: "#fff"
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

      PreferencesController.addLabel(req, res).then(() => {
        const label = res.labels.find(label => label.name === newLabel.name);

        expect(label.name).toBe(newLabel.name);
        expect(label.color).toBe(newLabel.color);
        done();
      });
    });

    it("should return error when user reaches limit of labels", done => {
      const req = {
        user: {
          id: fakeUserId
        },
        body: {
          label: {
            name: "Test label name",
            color: "#fff"
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

      PreferencesController.addLabel(req, res).then(() => {
        expect(res.errors[0].msg).toBe("You can create up to 10 labels!");
        done();
      });
    });
  });

  describe("removeLabel", () => {
    it("should return labels except removed label", done => {
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

      PreferencesController.removeLabel(req, res).then(() => {
        const removedIndex = res.userLabels.findIndex(
          label => label._id === req.params.labelId
        );
        expect(removedIndex).toBe(-1);
        done();
      });
    });

    it("should return remove label from all tasks where it occurs", done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          labelId: generateObjectId(1)
        }
      };

      const res = {
        statusCode: 500,
        updatedTasks: null,
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          this.updatedTasks = data.updatedTasks;
        }
      };

      PreferencesController.removeLabel(req, res).then(() => {
        expect(res.statusCode).toBe(200);

        res.updatedTasks.forEach(task => {
          const removedLabelIndex = task.labels.findIndex(
            label => label._id === req.params.labelId
          );
          expect(removedLabelIndex).toBe(-1);
        });
        done();
      });
    });
  });

  describe("updateLabel", () => {
    it("should return 400 error if labelId not provided", done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {},
        body: {
          label: {
            name: "updated label",
            color: "#323232"
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      PreferencesController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(400);
        expect(res.errors[0].msg).toBe(
          "You need to pass label ID to update it!"
        );
        done();
      });
    });

    it("should return 404 error if label with provided ID does not exists", done => {
      const req = {
        user: {
          id: fakeUserId
        },
        params: {
          labelId: generateObjectId(5)
        },
        body: {
          label: {
            name: "updated label",
            color: "#323232"
          }
        }
      };

      const res = new ResponseWithErrorsArray();

      PreferencesController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(404);
        expect(res.errors[0].msg).toBe("Label not found!");
        done();
      });
    });

    it("should return modified label if updated successfully", done => {
      const modifiedLabel = {
        name: "UPDATED label",
        color: "#555"
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

      PreferencesController.updateLabel(req, res).then(() => {
        expect(res.statusCode).toBe(200);
        expect(res.label).toEqual(expect.objectContaining(modifiedLabel));
        done();
      });
    });
  });

  /** --------- User projects tests --------- */
  //   describe('addProject', () => {
  //     it('should return 400 error if user already created project same name', done => {
  //       const existingProject = 'project_4';
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         body: {
  //           project: {
  //             name: existingProject,
  //             color: '#fff'
  //           }
  //         }
  //       };
  //       const res = new ResponseWithErrorsArray();

  //       PreferencesController.addProject(req, res).then(() => {
  //         expect(res.statusCode).toBe(400);
  //         expect(res.errors[0].msg).toBe(
  //           `Project '${existingProject}' already exist!`
  //         );
  //         done();
  //       });
  //     });
  //     it('should return created project if added with success', done => {
  //       const newProject = {
  //         name: 'project_9',
  //         color: '#444'
  //       };
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         body: {
  //           project: newProject
  //         }
  //       };
  //       const res = {
  //         statusCode: 500,
  //         project: null,
  //         status(code) {
  //           this.statusCode = code;
  //           return this;
  //         },
  //         json(data) {
  //           this.project = data;
  //         }
  //       };
  //       PreferencesController.addProject(req, res).then(() => {
  //         const { name, color } = res.project;
  //         expect(name).toBe(newProject.name);
  //         expect(color).toBe(newProject.color);
  //         done();
  //       });
  //     });

  //     it('should return 400 error when user reaches limit of projects', done => {
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         body: {
  //           project: {
  //             name: 'Test project name',
  //             color: '#ffddee'
  //           }
  //         }
  //       };
  //       const res = new ResponseWithErrorsArray();

  //       PreferencesController.addProject(req, res).then(() => {
  //         expect(res.statusCode).toBe(400);
  //         expect(res.errors[0].msg).toBe('You can create up to 10 projects!');
  //         done();
  //       });
  //     });
  //   });

  //   describe('removeProject', () => {
  //     it('should return removed project ID if removed successfully', done => {
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         params: {
  //           projectId: generateObjectId(6)
  //         }
  //       };
  //       const res = {
  //         statusCode: 500,
  //         removedProjectId: null,
  //         userProjects: null,
  //         status: function(code) {
  //           this.statusCode = code;
  //           return this;
  //         },
  //         json: function(data) {
  //           this.removedProjectId = data.removedProjectId;
  //           this.userProjects = data.userProjects;
  //         }
  //       };

  //       PreferencesController.removeProject(req, res).then(() => {
  //         expect(res.removedProjectId).toBe(generateObjectId(6));
  //         expect(
  //           res.userProjects.findIndex(p => p.id === generateObjectId(6))
  //         ).toBe(-1);

  //         done();
  //       });
  //     });

  //     it('should return remove project from also from user Tasks if removed successfully', done => {
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         params: {
  //           projectId: generateObjectId(3)
  //         }
  //       };
  //       const res = {
  //         statusCode: 500,
  //         status: function(code) {
  //           this.statusCode = code;
  //           return this;
  //         },
  //         json: function(data) {}
  //       };

  //       PreferencesController.removeProject(req, res).then(userTasks => {
  //         const isAnyTaskWithProject3 = userTasks.some(task =>
  //           task.project._id
  //             ? task.project._id.toString() === generateObjectId(3)
  //             : false
  //         );
  //         expect(isAnyTaskWithProject3).toBe(false);

  //         done();
  //       });
  //     });
  //   });

  //   describe('updateProject', () => {
  //     it('should return updated project if modifed successfully', done => {
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         params: {
  //           projectId: generateObjectId(4)
  //         },
  //         body: {
  //           project: {
  //             name: 'project_4',
  //             color: '#323232'
  //           }
  //         }
  //       };
  //       const res = {
  //         statusCode: 500,
  //         updatedProject: null,
  //         status: function(code) {
  //           this.statusCode = code;
  //           return this;
  //         },
  //         json: function(data) {
  //           this.updatedProject = data;
  //         }
  //       };

  //       PreferencesController.updateProject(req, res).then(() => {
  //         expect(res.statusCode).toBe(200);
  //         expect(res.updatedProject).toEqual(
  //           expect.objectContaining({
  //             id: generateObjectId(4),
  //             name: req.body.project.name,
  //             color: req.body.project.color
  //           })
  //         );
  //         done();
  //       });
  //     });

  //     it('should return updated project if modifed successfully', done => {
  //       const req = {
  //         user: {
  //           id: fakeUserId
  //         },
  //         params: {
  //           projectId: generateObjectId(6)
  //         },
  //         body: {
  //           project: {
  //             name: 'project_6_updated',
  //             color: '#323232'
  //           }
  //         }
  //       };
  //       const res = new ResponseWithErrorsArray();

  //       PreferencesController.updateProject(req, res).then(() => {
  //         expect(res.statusCode).toBe(404);
  //         expect(res.errors[0].msg).toBe('Project not found!');
  //         done();
  //       });
  //     });
  //   });
});
