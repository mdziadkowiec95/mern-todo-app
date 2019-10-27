const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const User = require('../../models/User');
const authMiddleware = require('../../middleware/auth');
const calcTime = require('../../utils/calcTime');

/**
 * @route GET api/tasks/serach/serachQuery=TITLE_QUERY
 * @desc Search for task by title (return titles for autosugestion);
 * @access Private
 */

router.get('/search', authMiddleware, async (req, res) => {
  try {
    const titleQuery = req.query.searchQuery;

    if (!titleQuery)
      return res.status(404).json({
        errors: [
          {
            msg: 'You have not provided any title'
          }
        ]
      });

    const regex = new RegExp(`.*${titleQuery}.*`, 'i');

    const titles = await Task.find({
      user: req.user.id,
      title: regex
    }).select('title');

    if (titles.length === 0)
      return res.status(404).json({ erorrs: [{ msg: 'No tasks found!' }] });

    res.json(titles);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server erorr!');
  }
});

/**
 * @route GET api/tasks/
 * @desc Get tasks for specific User (optional - query params based filters)
 * @access Private
 */

router.get('/', authMiddleware, async (req, res) => {
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
});

/**
 * @route GET api/tasks/:taskId
 * @desc Get specific Task by ID
 * @access Private
 */

router.get('/:taskId', authMiddleware, async (req, res) => {
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
});

/**
 * @route POST api/tasks
 * @desc Create or update task for User (if taskId is provided then try to update existing task)
 * @access Private
 */

router.post('/', authMiddleware, async (req, res) => {
  const {
    taskId,
    title,
    date,
    labelsIDs,
    project,
    priority,
    status
  } = req.body;

  const taskFields = {
    user: req.user.id
  };

  if (title) taskFields.title = title;
  if (project) taskFields.project = project;
  if (priority) taskFields.priority = priority;
  if (status) taskFields.status = status;

  if (date && status === 'active') taskFields.date = date;

  try {
    if (labelsIDs) {
      const userLabels = await User.findById(req.user.id).select('labels');

      const selectedLabels = userLabels.labels.filter(label =>
        labelsIDs.includes(label.id) ? label : false
      );

      if (selectedLabels) taskFields.labels = selectedLabels;
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
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
  }
});

/**
 * @route DELETE api/tasks/:taskId
 * @desc Delete single task from User tasks by ID
 * @access Private
 */

router.delete('/:taskId', authMiddleware, async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);

    if (!task)
      return res.status(404).json({ erorrs: [{ msg: 'Task not found!' }] });

    if (task.user.toString() !== req.user.id)
      return res.status(401).json({
        errors: [{ msg: 'You are NOT authorized to delete this task!' }]
      });

    await task.remove();

    res.json({ msg: 'Task has been removed!' });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
  }
});

module.exports = router;
