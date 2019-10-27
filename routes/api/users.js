const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authMiddleware = require('../../middleware/auth');
const UsersController = require('../../controllers/users');

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

/**
 * @route PUT api/users/labels
 * @desc Add label to user private labels
 * @access Private
 */

router.put('/labels', authMiddleware, UsersController.addLabel);

/**
 * @route DELETE api/users/labels/:labelId
 * @desc Remove label from user private labels
 * @access Private
 */

router.delete('/labels/:labelId', authMiddleware, UsersController.removeLabel);

module.exports = router;
