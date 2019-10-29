const Task = require('../models/Task');
const User = require('../models/User');
const calcTime = require('../utils/calcTime');

exports.searchTask = async (req, res) => {
  try {
    const titleQuery = req.query.searchQuery;

    if (!titleQuery)
      return res.status(404).json({
        errors: [
          {
            msg: 'You have not provided any title!'
          }
        ]
      });

    const regex = new RegExp(`.*${titleQuery}.*`, 'i');

    const titles = await Task.find({
      user: req.user.id,
      title: regex
    }).select('title');

    if (titles.length === 0)
      return res.status(404).json({ errors: [{ msg: 'No tasks found!' }] });

    res.json(titles);
    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server erorr!');
  }
};

exports.getTasks = async (req, res) => {
  const { status, timePeriod, project, labelId } = req.query;

  const filters = {
    user: req.user.id
  };

  // Construct filters object
  if (timePeriod) {
    filters.date = {
      $gte: new Date(
        new Date() + timePeriod === 'today'
          ? calcTime.getDays(1)
          : calcTime.getDays(7)
      )
    };
  }

  if (status) filters.status = status;
  if (project) filters.project = project;

  if (labelId) {
    const userLabels = await User.findById(req.user.id).select('labels');

    const selectedLabel = userLabels.labels.find(label => label.id === labelId);

    if (!selectedLabel) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'No tasks found with provided label!' }] });
    }

    filters.labels = {
      $all: [selectedLabel]
    };
  }

  try {
    const tasks = await Task.find(filters);

    if (!tasks)
      return res.status(400).json({
        errors: [
          {
            msg: 'Tasks list list empty!'
          }
        ]
      });

    res.json(tasks);
  } catch (error) {
    console.log(error.message);

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
  const {
    taskId,
    title,
    date,
    labelsIDs,
    projectId,
    priority,
    status
  } = req.body;

  const taskFields = {
    user: req.user.id
  };

  if (title) taskFields.title = title;
  if (priority) taskFields.priority = priority;
  if (status) taskFields.status = status;
  if (date && status === 'active') taskFields.date = date;

  try {
    let user;

    if (projectId || labelsIDs) {
      const fieledTypes = [];

      if (projectId) fieledTypes.push('projects');
      if (labelsIDs) fieledTypes.push('labels');

      user = await User.findById(req.user.id).select(fieledTypes);

      if (user.labels) {
        const selectedLabels = user.labels.filter(label =>
          labelsIDs.includes(label.id) ? label : false
        );

        if (selectedLabels) taskFields.labels = selectedLabels;
      }

      if (user.projects) {
        const selectedProject = user.projects.find(
          project => project.id === projectId
        );

        taskFields.project = {
          _id: projectId,
          name: selectedProject.name,
          color: selectedProject.color
        };
      }
    }

    let task;

    if (taskId) task = await Task.findOne({ user: req.user.id, _id: taskId });

    if (task) {
      task = await Task.findOneAndUpdate(
        { user: req.user.id },
        { $set: taskFields },
        { new: true }
      );

      return res.json(task);
    }

    const newTask = new Task(taskFields);

    await newTask.save();

    res.json(newTask);
    return;
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
    return error;
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

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
