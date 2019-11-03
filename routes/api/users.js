const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const UsersController = require('../../controllers/users');
const { isValidColor } = require('../../utils/validators');
/**
 * @route POST api/users
 * @desc Register user and get JWT
 * @access Public
 */

router.post(
  '/',
  [
    check('email')
      .isEmail()
      .withMessage('Please, provide correct email address!'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long!'),
    check('name')
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long')
  ],
  UsersController.registerUser
);

/**
 * @route POST api/users/change-password
 * @desc Change User's password
 * @access Private
 */

router.put(
  '/change-password',
  [
    authMiddleware,
    check(
      'oldPassword',
      'Password must be at least 8 characters long!'
    ).isLength({ min: 8 }),
    check('newPasswordConfirm')
      .isLength({ min: 8 })
      .withMessage('Passwords must be at least 8 characters long!')
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage(
        'Password and Password confirmation must be exactly the same!'
      ),
    check('newPassword', 'New password must be different than old one!').custom(
      (value, { req }) => value !== req.body.oldPassword
    )
  ],
  UsersController.changePassword
);

/** --------- User labels routes --------- */

/**
 * @route PUT api/users/labels
 * @desc Add label to user private labels
 * @access Private
 */

router.put(
  '/labels',
  [
    authMiddleware,
    check('label', 'Label must have some name and a valid color!').custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  UsersController.addLabel
);

/**
 * @route PUT api/users/labels/:labelId
 * @desc Update single label in user private labels array
 * @access Private
 */

router.put(
  '/labels/:labelId',
  [
    authMiddleware,
    check('label', 'Label must have some name and a valid color!').custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  UsersController.updateLabel
);

/**
 * @route DELETE api/users/labels/:labelId
 * @desc Remove label from user private labels
 * @access Private
 */

router.delete('/labels/:labelId', authMiddleware, UsersController.removeLabel);

/** --------- User projects routes --------- */

/**
 * @route PUT api/users/projects
 * @desc Add project to user projects
 * @access Private
 */

router.put(
  '/projects',
  [
    authMiddleware,
    check('project', 'Project must have some name and a valid color!').custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  UsersController.addProject
);

/**
 * @route PUT api/users/projects/:projectId
 * @desc Update single project in user projects array
 * @access Private
 */

router.put(
  '/projects/:projectId',
  [
    authMiddleware,
    check('project', 'Project must have some name and a valid color!').custom(
      ({ name, color }, { req }) => name && color && isValidColor(color)
    )
  ],
  UsersController.updateProject
);

/**
 * @route DELETE api/users/projects/:projectId
 * @desc Remove project from user projects array
 * @access Private
 */

router.delete(
  '/projects/:projectId',
  authMiddleware,
  UsersController.removeProject
);

module.exports = router;
