const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');
const User = require('../../models/User');
const authMiddleware = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server error!');
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, date, labels, project, priority, status } = req.body;

    const newTask = new Task({
      user: req.user.id,
      title
    });

    if (date) newTask.date = date;
    if (project) newTask.project = project;
    if (priority) newTask.priority = priority;
    if (status) newTask.status = status;

    // if (labels && labels.length > 0) newTask.labels = labels;

    /** TODO */

    /** const labels = await User.findById(req.user.id).select('labels'); */

    // 1.  Recieve labels IDs and populate newTask with labels from User labels preferences.
    // 2. Same behaviour will be according to projects

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
  }
});

// router.put('/:task_id', async (req, res) => {
//   try {
//     const taskID = req.params.task_id;
//     const task = await Task.findById(taskID);

//     if (task) {
//       task.expireAt = undefined;
//       await task.save();

//       return res.json(task);
//     }

//     return res.json({ msg: 'Task not found!' });
//   } catch (error) {
//     console.log(error.message);

//     res.status(500).send('Server error!');
//   }
// });

module.exports = router;
