const { validationResult } = require("express-validator");
const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });

    res.json(projects);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server error!");
  }
};

exports.createProject = async (req, res) => {
  const name = req.body.name.trim();
  let description = req.body.description;
  const { color } = req.body;

  if (description) description = description.trim();

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const userProjects = await Project.find({ user: req.user.id });

    if (userProjects.length >= 10)
      return res
        .status(400)
        .json({ errors: [{ msg: "You can create up to 10 projects!" }] });

    const projectExist =
      userProjects.findIndex(project => project.name === name) !== -1;

    if (projectExist)
      return res.status(400).json({
        errors: [{ msg: `Project '${name}' already exist!` }]
      });

    const newProject = new Project({
      user: req.user.id,
      name,
      color
    });
    await newProject.save();

    res.status(201).json(newProject);
    return;
  } catch (error) {
    console.error(error);

    res.status(500).send("Server error!");
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
      return res.status(404).json({ errors: [{ msg: "Project not found!" }] });

    res.status(200).json(project);
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Project not found!" }] });

    res.status(500).send("Server error!");
    return error;
  }
};

exports.removeProject = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await Project.findById(projectId);

    if (!project)
      return res.status(404).json({ errors: [{ msg: "Project not found!" }] });

    await project.remove();

    res.status(200).json({ msg: "Project has been removed!" });
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Project not found!" }] });

    res.status(500).send("Server error!");
    return error;
  }
};
