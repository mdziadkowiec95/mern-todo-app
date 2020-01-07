const { validationResult } = require("express-validator");
const User = require("../models/User");
const Task = require("../models/Task");
const Preferences = require("../models/Preferences");
const Project = require("../models/Project");

exports.getPreferences = async (req, res) => {
  try {
    const userPreferences = await Preferences.findOne({
      user: req.user.id
    }).select("-labels");

    res.json(userPreferences);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server error!");
  }
};

exports.getLabelsAndProjects = async (req, res) => {
  try {
    const userPreferences = await Preferences.findOne({
      user: req.user.id
    }).select("labels");

    const userProjects = await Project.find({ user: req.user.id }).select([
      "name",
      "color"
    ]);

    res.json({
      labels: userPreferences.labels,
      projects: userProjects
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server error!");
  }
};

/** --------- User labels controllers --------- */
exports.addLabel = async (req, res) => {
  const label = req.body.label;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const userPreferences = await Preferences.findOne({ user: req.user.id });

    if (!userPreferences)
      return res
        .status(404)
        .json({ errors: [{ msg: "Preferences for the User not found!" }] });

    if (userPreferences.labels.length >= 10)
      return res
        .status(400)
        .json({ errors: [{ msg: "You can create up to 10 labels!" }] });

    if (userPreferences.labels.map(label => label.name).includes(label.name))
      return res
        .status(400)
        .json({ errors: [{ msg: `Label '${label.name}' already exist!` }] });

    userPreferences.labels.push(label);

    await userPreferences.save();

    res.status(201).json(userPreferences.labels);

    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server error!");
    return error;
  }
};

exports.updateLabel = async (req, res) => {
  const labelId = req.params.labelId;
  const updatedLabel = req.body.label;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!labelId)
    return res
      .status(400)
      .json({ errors: [{ msg: "You need to pass label ID to update it!" }] });
  try {
    const userLabels = await Preferences.findOneAndUpdate(
      { user: req.user.id, "labels._id": labelId },
      {
        $set: {
          "labels.$.name": updatedLabel.name,
          "labels.$.color": updatedLabel.color
        }
      },
      { new: true }
    ).select("labels");

    if (!userLabels)
      return res.status(404).json({ errors: [{ msg: "Label not found!" }] });

    const modifiedLabel = userLabels.labels.find(l => l.id === labelId);

    res.status(200).json(modifiedLabel);

    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Label not found!" }] });

    res.status(500).send("Server error!");
    return error;
  }
};

exports.removeLabel = async (req, res) => {
  try {
    const labelId = req.params.labelId;

    // Maybe it would work with selecting only 'labels' ??
    const userPreferences = await Preferences.findOne({
      user: req.user.id
    }).select("labels");

    if (!userPreferences)
      return res.status(404).json({ errors: [{ msg: "User not found!" }] });

    // TODO --> Try to simplify it
    const labelIndex = userPreferences.labels.findIndex(
      label => label.id === labelId
    );

    if (labelIndex === -1)
      return res.status(404).json({ errors: [{ msg: "Label not found!" }] });

    // Find all User tasks where the label exists
    const userTasks = await Task.find({
      user: req.user.id,
      labels: {
        $all: [userPreferences.labels[labelIndex]]
      }
    });

    // Remove the label from User labels
    userPreferences.labels.splice(labelIndex, 1);
    await userPreferences.save();

    if (userTasks) {
      // Remove the label from from these tasks
      userTasks.forEach(async task => {
        task.labels = task.labels.filter(label => label.id !== labelId);

        await task.save();
      });
    }

    res.status(200).json({
      removedLabelId: labelId,
      updatedTasks: userTasks,
      userLabels: userPreferences.labels
    });
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId")
      return res.status(404).json({ errors: [{ msg: "Label not found!" }] });

    res.status(500).send("Server error!");
    return error;
  }
};
