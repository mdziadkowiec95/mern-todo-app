const { validationResult } = require('express-validator');
const { convertUploadFileName } = require('../utils/stringFormatting');
const Project = require('../models/Project');
const Task = require('../models/Task');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const unLinkAsync = util.promisify(fs.unlink);

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_TOTAL = MAX_FILE_SIZE_MB * 1024 * 1024;

const isValidType = fileType => {
  const fileMimetypes = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'application/pdf'
  ];
  return fileMimetypes.includes(fileType);
};

const isValidSize = fileSize => fileSize <= MAX_FILE_SIZE_TOTAL;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const projectId = req.params.projectId;
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
    const fileName = convertUploadFileName(file.originalname);

    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (!req.params.projectId) {
    return cb(new Error('Upload failed! Project not found.'), false);
  }

  if (req.body.preUploadFileList) {
    const preUploadFileList = JSON.parse(req.body.preUploadFileList);

    let invalidFileNames = [];

    preUploadFileList.forEach(file => {
      if (!isValidType(file.fileType) || !isValidSize(file.fileSize)) {
        invalidFileNames.push(`"${file.fileName}"`);
      }
    });

    // @todo -- adjust error message to contain info about preValidation results

    if (invalidFileNames.length > 0) {
      const invalidFileNamesMsg = invalidFileNames.join(', ');

      return cb(
        new Error(
          `Validation error in files: ${invalidFileNamesMsg}. Valid file formats: .jpg/jpeg, .png, .bmp, .pdf. Max size: ${MAX_FILE_SIZE_MB}mb`
        ),
        false
      );
    }
  }

  if (isValidType(file.mimetype)) {
    cb(null, true); // store file
  } else {
    cb(
      new Error(
        'The file has wrong format. You can use following file formats: .jpg/jpeg, .png, .bmp, .pdf'
      ),
      false
    ); // reject file
  }
};

const uploadProjectFiles = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE_TOTAL
  },
  fileFilter
}).single('projectFile');

exports.uploadFile = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });

    if (!project)
      return res.status(404).json({
        errors: [
          {
            msg: 'Upload failed! Project not found.'
          }
        ]
      });

    uploadProjectFiles(req, res, async function(err) {
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
      const uploadedFile = req.file;

      const newFile = {
        name: uploadedFile.originalname,
        path: uploadedFile.path,
        mimetype: uploadedFile.mimetype
      };

      const filesNewLength = project.files.push(newFile);

      await project.save();

      const addedFile = project.files[filesNewLength - 1];

      res.json({
        msg: `${uploadedFile.originalname} file uploaded!`,
        file: addedFile,
        createdDate: Date.now(),
        success: true
      });
    });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res
        .status(404)
        .json({ errors: [{ msg: 'Upload failed! Project not found.' }] });

    res.status(500).send('Server error!');
  }
};

exports.removeFile = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      user: req.user.id
    });

    if (!project)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    const fileIndex = project.files.findIndex(
      file => file._id.toString() === req.params.fileId
    );

    if (fileIndex === -1)
      return res
        .status(404)
        .json({ errors: [{ msg: 'File does not exist!' }] });

    const file = project.files[fileIndex];

    if (!file.path.includes(req.params.projectId))
      return res.status(401).json({
        errors: [{ msg: 'You are not authorized to remove this file!' }]
      });

    project.files.splice(fileIndex, 1);

    await project.save();
    await unLinkAsync(file.path);

    res.status(201).json({
      msg: `File "${file.name}" has been deleted successfuly!`
    });
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

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
  try {
    const projectId = req.params.projectId;
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
