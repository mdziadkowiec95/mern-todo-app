const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const User = require('../../models/User');
const authMiddleware = require('../middleware/auth');

/**
 * @route GET api/tasks
 * @desc Get all tasks for specific User
 * @access Private
 */

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    if (!tasks)
      return res
        .status(400)
        .json({ errors: [{ msg: 'Tasks list list empty!' }] });

    res.json(tasks);
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server error!');
  }
});

/**
 * @route POST api/tasks
 * @desc Add new task for User
 * @access Private
 */

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, date, labelsIDs, project, priority, status } = req.body;

    const newTask = new Task({
      user: req.user.id,
      title
    });

    if (date) newTask.date = date;
    if (project) newTask.project = project;
    if (priority) newTask.priority = priority;
    if (status) newTask.status = status;

    if (labelsIDs) {
      const userLabels = await User.findById(req.user.id).select('labels');

      const selectedLabels = userLabels.labels.filter(label =>
        labelsIDs.includes(label.id) ? label : false
      );

      if (selectedLabels) newTask.labels = selectedLabels;
    }

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
  }
});

/**
 * @route DELETE api/tasks
 * @desc Delete single task from User tasks
 * @access Private
 */

router.delete('/:task_id', authMiddleware, async (req, res) => {
  const taskId = req.params.task_id;

  try {
    const task = await Task.findById(taskId);

    if (!task)
      return res.status(404).json({ erorrs: [{ msg: 'Task not found!' }] });

    if (task.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ errors: [{ msg: 'User is not an author of the task!' }] });

    await task.remove();

    res.json({ errors: [{ msg: 'Task has been removed!' }] });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Task not found!' }] });

    res.status(500).send('Server error!');
  }
});

module.exports = router;
