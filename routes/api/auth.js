const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth');

/**
 * @route GET api/auth
 * @desc Authenticate user
 * @access Private
 */

router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
  }
});

/**
 * @route POST api/auth
 * @desc Sign in user and get JWT
 * @access Public
 */

router.post(
  '/',
  [
    check('email')
      .isEmail()
      .withMessage('Please, enter correct email!'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long!')
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!user) {
        return res.status(404).json({ erorrs: [{ msg: 'User not found!' }] });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.json({
          errors: [{ msg: 'Please, enter correct credientials!' }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('mySecretJwt'),
        { expiresIn: 12 * 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error!');
    }
  }
);

module.exports = router;
