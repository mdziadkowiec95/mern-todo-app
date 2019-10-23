const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Task = require('../../models/Task');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

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
  async (req, res) => {
    const { email, password, passwordConfirm, name } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // Do I really need to check it on backend?
    if (password !== passwordConfirm) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Passwords must be the same'
          }
        ]
      });
    }
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [{ msg: 'User with this email already exists!' }]
        });
      }
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm' // Default avatar. 'mm' will give you default user avatar
      });

      user = new User({
        email,
        name,
        avatar
      });

      const salt = await bcrypt.genSaltSync(10);
      user.password = await bcrypt.hashSync(password, salt);

      await user.save();

      const jwtPayload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        jwtPayload,
        config.get('mySecretJwt'),
        { expiresIn: 12 * 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);

      res.status(500).send('Server error!');
    }
  }
);

/**
 * @route PUT api/users/labels
 * @desc Add label to user private labels
 * @access Private
 */

router.put('/labels', authMiddleware, async (req, res) => {
  try {
    const label = req.body.label;

    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });

    if (user.labels.length >= 10)
      return res
        .status(400)
        .json({ errors: [{ msg: 'You can create up to 10 labels!' }] });

    if (user.labels.map(label => label.name).includes(label.name))
      return res
        .status(400)
        .json({ errors: [{ msg: `Label '${label.name}' already exist!` }] });

    user.labels.push(label);

    await user.save();

    res.json(user.labels);
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
  }
});

/**
 * @route DELETE api/users/labels/:label_id
 * @desc Remove label from user private labels
 * @access Private
 */

router.delete('/labels/:label_id', authMiddleware, async (req, res) => {
  try {
    const labelId = req.params.label_id;

    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });

    // TO VERIFY - Find targeted label from user labels
    // Maybe there is some method/parameter in MongoDB to filter tasks directly in find() method
    const label = user.labels.find(label => label.id === labelId);

    // Find all User tasks where the label exists
    const userTasks = await Task.find({
      user: req.user.id,
      labels: {
        $all: [label]
      }
    });

    if (!userTasks)
      return res.status(404).json({
        errors: [{ msg: 'There are no tasks associated with this label!' }]
      });

    // Remove the label from User labels
    user.labels = user.labels.filter(label => label.id !== labelId);

    await user.save();

    // Remove the label from from these tasks
    userTasks.forEach(async task => {
      task.labels = task.labels.filter(label => label.id !== labelId);

      await task.save();
    });

    res.json({
      removedLabelId: labelId,
      userLabels: user.labels
    });
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
  }
});

module.exports = router;
