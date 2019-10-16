const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server error!');
  }
});

router.post('/', async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title
    });

    const date = new Date();
    const minutes = date.getMinutes();

    if (minutes < 59) {
      date.setMinutes(date.getMinutes() + 1);
    } else {
      if (date.getHours() < 23) {
        date.setHours(date.getHours() + 1);
        date.setMinutes(0);
      } else {
        date.setHours(0);
        date.setMinutes(0);
      }
    }

    if (req.body.title) newTask.expireAt = date;

    await newTask.save();

    res.json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error!');
  }
});

router.put('/:task_id', async (req, res) => {
  try {
    const taskID = req.params.task_id;
    const task = await Task.findById(taskID);

    if (task) {
      task.expireAt = undefined;
      await task.save();

      return res.json(task);
    }

    return res.json({ msg: 'Task not found!' });
  } catch (error) {
    console.log(error.message);

    res.status(500).send('Server error!');
  }
});

module.exports = router;
