const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const DashboardController = require('../../controllers/dashboards');

/**
 * @route GET api/dashboards/stats/
 * @desc Get user's dashboard stats (overview)
 * @access Private
 */

router.get('/stats', authMiddleware, DashboardController.getStats);

module.exports = router;
