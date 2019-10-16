const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

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
          is: newUser.id
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
      return res.status(500).send('Server error!');
    }
  }
);

module.exports = router;
