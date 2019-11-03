const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json(user);
    return;
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
    return error;
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
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

    return error;
  }
};
