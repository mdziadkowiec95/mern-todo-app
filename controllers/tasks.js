const calcTime = require('../utils/calcTime');
const Task = require('../models/Task');
const User = require('../models/User');
const Dashboard = require('../models/Dashboard');
const Preferences = require('../models/Preferences');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.searchTask = async (req, res) => {
  try {
    const titleQuery = req.query.searchQuery;

    if (!titleQuery) return res.status(200).json({ results: [] });

    const regex = new RegExp(`.*${titleQuery}.*`, 'i');

    const tasks = await Task.find({
      user: req.user.id,
      title: regex
    }).select('title');

    if (tasks.length === 0) return res.status(200).json({ results: [] });

    res.json({ results: tasks });
    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
  }
};

exports.getTasks = async (req, res) => {
  // Status won't be necessary
  const { status, timePeriod, projectId, labelId } = req.query;

  const filters = {
    user: req.user.id
  };

  // if (status !== "inbox") {
  if (timePeriod) {
    const dateRange = {
      $gte: null,
      $lte: null
    };

    if (timePeriod === 'today') {
      const dayStart = new Date();
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date();
      dayEnd.setHours(23, 59, 59, 999);

      dateRange.$gte = dayStart;
      dateRange.$lte = dayEnd;
    } else if (timePeriod === 'nextWeek') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const afterSevenDays = new Date(+new Date() + 7 * 24 * 60 * 60 * 1000);

      dateRange.$gte = today;
      dateRange.$lte = afterSevenDays;
    }

    filters.date = dateRange;
  }

  if (projectId) filters['project._id'] = projectId;

  if (labelId) {
    const userPreferences = await Preferences.findOne({
      user: req.user.id
    }).select('labels');

    const selectedLabel = userPreferences.labels.find(
      label => label.id === labelId
    );

    if (!selectedLabel) {
      return res
        .status(200)
        .json({ errors: [{ msg: 'No tasks found with provided label!' }] });
    }

    filters.labels = {
      $all: [selectedLabel]
    };
  }

  try {
    const tasks = await Task.find(filters).sort({ date: 1 });

    res.json(tasks);
  } catch (error) {
    console.log(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
  }
};

exports.getSingleTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOne({
      user: req.user.id,
      _id: taskId
    });

    if (!task)
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.json(task);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
  }
};

exports.createOrUpdateTask = async (req, res) => {
  const { taskId, title, date, labelsIDs, projectId, priority } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const taskFields = {
    user: req.user.id
  };

  if (title) taskFields.title = title;
  if (priority) taskFields.priority = priority;

  if (date) {
    taskFields.status = 'active';
    taskFields.date = date;
  } else {
    taskFields.status = 'inbox';
  }

  try {
    // Assign user labels to the task
    if (labelsIDs) {
      const userLabels = await Preferences.findOne({
        user: req.user.id
      }).select('labels');

      if (userLabels.labels && userLabels.labels.length > 0) {
        const selectedLabels = userLabels.labels.filter(label =>
          labelsIDs.includes(label.id)
        );

        if (selectedLabels) taskFields.labels = selectedLabels;
      }
    }
    // Assign user project to the task
    if (projectId) {
      const userProjects = await Project.find({ user: req.user.id }).select([
        'name',
        'color'
      ]);

      if (userProjects && userProjects.length > 0) {
        const selectedProject = userProjects.find(
          project => project.id === projectId
        );

        if (selectedProject) {
          taskFields.project = {
            _id: projectId,
            name: selectedProject.name,
            color: selectedProject.color
          };
        }
      }
    } else {
      taskFields.project = undefined;
    }

    // if (taskId) task = await Task.findOne({ user: req.user.id, _id: taskId });

    if (taskId) {
      const task = await Task.findOneAndUpdate(
        { user: req.user.id, _id: taskId },
        { $set: taskFields },
        { new: true }
      );

      if (!task)
        return res
          .status(400)
          .json({ errors: [{ msg: `Update error. Task not found!` }] });

      return res.status(200).json(task);
    }

    const newTask = new Task(taskFields);

    await newTask.save();

    res.status(200).json(newTask);
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};

exports.removeTask = async (req, res) => {
  const taskId = req.params.taskId;
  const destroyTask = req.query.destroy;

  if (!taskId)
    return res
      .status(400)
      .json({ errors: [{ msg: 'You need to pass task ID to delete it!' }] });

  try {
    const task = await Task.findById(taskId);

    if (!task)
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({
        errors: [{ msg: 'You are NOT authorized to delete this task!' }]
      });

    await task.remove();

    if (!destroyTask) {
      const userDashboard = await Dashboard.findOne({ user: req.user.id });

      if (userDashboard) {
        // Push empty item with Date.now by default just to store info about whether task is done and when
        userDashboard.tasksDoneList.push({});

        await userDashboard.save();
      }
    }

    res.status(200).json({ msg: 'Task has been removed!' });
    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};
