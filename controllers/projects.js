const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const Task = require('../models/Task');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const projectId = req.body.projectId;
    const directory = `./uploads/projects/${projectId}`;

    fs.exists(directory, exist => {
      if (!exist) {
        return fs.mkdir(directory, { recursive: true }, error =>
          cb(error, directory)
        );
      }
      return cb(null, directory);
    });
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (!req.body.projectId) {
    return cb(new Error('Error! Project not found.'), false);
  }

  const fileMimetypes = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'application/pdf'
  ];

  if (fileMimetypes.includes(file.mimetype)) {
    cb(null, true); // store file
  } else {
    cb(new Error('The file has wrong format'), false); // reject file
  }
};

const uploadProjectFiles = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 15
  },
  fileFilter
}).fields([{ name: 'projectFiles', maxCount: 10 }]);

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });

    res.json(projects);
    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
  }
};

exports.getSingleProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findOne({
      user: req.user.id,
      _id: projectId
    });

    if (!project)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.json(project);
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(500).send('Server error!');
  }
};

exports.createProject = async (req, res) => {
  try {
    const name = req.body.name.trim();
    let description = req.body.description;
    const { color } = req.body;

    if (description) description = description.trim();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const userProjects = await Project.find({ user: req.user.id });

    if (userProjects.length >= 10)
      return res
        .status(400)
        .json({ errors: [{ msg: 'You can create up to 10 projects!' }] });

    const projectExist =
      userProjects.findIndex(project => project.name === name) !== -1;

    if (projectExist)
      return res.status(400).json({
        errors: [{ msg: `Project '${name}' already exist!` }]
      });

    const newProject = new Project({
      user: req.user.id,
      name,
      color,
      description
    });
    await newProject.save();

    res.status(201).json(newProject);
    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
    return error;
  }
};

exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const { name, color, description } = req.body;

  const projectFields = {};

  if (name) projectFields.name = name;
  if (color) projectFields.color = color;
  if (description) projectFields.description = description;

  try {
    const project = await Project.findOneAndUpdate(
      { user: req.user.id, _id: projectId },
      { $set: projectFields },
      { new: true }
    );

    if (!project)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(200).json(project);
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};

exports.removeProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findOne({
      user: req.user.id,
      _id: projectId
    });

    const updatedTasksDBres = await Task.updateMany(
      { user: req.user.id, 'project._id': projectId },
      { $set: { project: undefined } }
    );

    if (!project)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    await project.remove();

    res
      .status(200)
      .json({ msg: 'Project has been removed!', removedProjectId: projectId });

    return updatedTasksDBres;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    /**
     * @todo
     * 1. Check if project exists (userId / projectId) msg ==> 'Unable to upload files. Project not found.'
     * 2. If exist then store file path references in DB in provided project
     */

    uploadProjectFiles(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(400).json({
          errors: [
            {
              msg: err.message
            }
          ]
        });
        // A Multer error occurred when uploading.
      } else if (err) {
        console.error(err);
        return res.status(400).json({
          errors: [
            {
              msg: err.message
            }
          ]
        });
        // An unknown error occurred when uploading.
      }

      // Successful upload logic starts here
      const uploadedFiles = req.files.projectFiles;

      res.json({
        msg: `${uploadedFiles.length} files uploaded!`,
        uploadedFiles: uploadedFiles.map(file => file.originalname)
      });
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
  }
};
