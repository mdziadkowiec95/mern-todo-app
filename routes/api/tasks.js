const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/auth');
const TasksController = require('../../controllers/tasks');
/**
 * @route GET api/tasks/serach/serachQuery=TITLE_QUERY
 * @desc Search for task by title (return titles for autosugestion);
 * @access Private
 */

router.get('/search', authMiddleware, TasksController.searchTask);

/**
 * @route GET api/tasks/
 * @desc Get tasks for specific User (optional - query params based filters)
 * @access Private
 */

router.get('/', authMiddleware, TasksController.getTasks);

/**
 * @route GET api/tasks/:taskId
 * @desc Get specific Task by ID
 * @access Private
 */

router.get('/:taskId', authMiddleware, TasksController.getSingleTask);

/**
 * @route POST api/tasks
 * @desc Create or update task for User (if taskId is provided then try to update existing task)
 * @access Private
 */

router.post('/', authMiddleware, TasksController.createOrUpdateTask);

/**
 * @route DELETE api/tasks/:taskId
 * @desc Delete single task from User tasks by ID
 * @access Private
 */

router.delete('/:taskId', authMiddleware, TasksController.removeTask);

module.exports = router;
