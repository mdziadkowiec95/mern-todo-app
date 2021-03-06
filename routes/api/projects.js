const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const ProjectsController = require('../../controllers/projects');
const { isValidColor } = require('../../utils/validators');

/**
 * @route GET api/projects
 * @desc Get all user projects
 * @access Private
 */

router.get('/', authMiddleware, ProjectsController.getProjects);

/**
 * @route GET api/projects/:projectId
 * @desc Get single project
 * @access Private
 */

router.get('/:projectId', authMiddleware, ProjectsController.getSingleProject);

/**
 * @route POST api/projects
 * @desc Add project for user
 * @access Private
 */

router.post(
  '/',
  [
    authMiddleware,
    check('name')
      .isLength({ min: 3 })
      .withMessage('Project name must be at least 3 characters long!'),
    check('color', 'Project must have valid color!').custom(
      (color, { req }) => color && isValidColor(color)
    )
  ],
  ProjectsController.createProject
);

/**
 * @route PUT api/projects/:projectId
 * @desc Update existing project for user
 * @access Private
 */

router.put(
  '/:projectId',
  [
    authMiddleware,
    check('name')
      .isLength({ min: 3 })
      .withMessage('Project name must be at least 3 characters long!'),
    check('description')
      .optional()
      .isLength({ min: 10 })
      .withMessage('Project description must be at least 3 characters long!'),
    check('color', 'Project must have valid color!').custom(
      (color, { req }) => color && isValidColor(color)
    )
  ],
  ProjectsController.updateProjectBaseInfo
);

/**
 * @route DELETE api/projects/:projectId
 * @desc Remove user's project
 * @access Private
 */

router.delete('/:projectId', authMiddleware, ProjectsController.removeProject);

/**
 * @route PUT api/projects/:projectId/upload-file
 * @desc Upload file for a project
 * @access Private
 */

router.put(
  '/:projectId/upload-file',
  authMiddleware,
  ProjectsController.uploadFile
);

/**
 * @route DELETE api/projects/:projectId/:fileId
 * @desc Delete single file from specific project
 * @access Private
 */

router.delete(
  '/:projectId/:fileId',
  authMiddleware,
  ProjectsController.removeFile
);

module.exports = router;
