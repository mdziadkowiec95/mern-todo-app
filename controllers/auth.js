const config = require('config');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const {
  generateEmailVerificationTemplate
} = require('../email-templates/email-verification');
const { sendEmail, logSendEmailError } = require('../utils/sendEmail');

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
    return;
  } catch (error) {
    console.error(error.message);

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
      return res.status(400).json({
        errors: [{ msg: 'Please, enter correct credientials!' }]
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Your account has not been verified. Please check your email!'
          }
        ]
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
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');

    return error;
  }
};

exports.emailConfirmation = async (req, res) => {
  try {
    const tokenQuery = req.query.token;

    if (!tokenQuery) {
      return res.status(400).json({
        errors: [{ msg: 'Token not provided!' }]
      });
    }

    const token = await Token.findOne({ token: tokenQuery });

    if (!token) {
      return res.status(400).json({
        errors: [
          {
            tokenExpired: true,
            msg: 'Token is not valid or has already expired!'
          }
        ]
      });
    }

    const user = await User.findOne({ _id: token._userId });

    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Token is not valid or has already expired!'
          }
        ]
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        userVerified: user.isVerified
      });
    }

    user.isVerified = true;

    await user.save();

    res.status(200).json({
      userVerified: user.isVerified
    });

    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

exports.emailConfirmationResend = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userEmail = req.body.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
    }

    if (user.isVerified) {
      return res.status(404).json({
        errors: [
          { msg: 'This account has already been verified. Please log in!' }
        ]
      });
    }

    const verificationToken = new Token({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex')
    });
    await verificationToken.save();

    // Send an email with confirmation link
    const protocol =
      req.connection && req.connection.encrypted ? 'https' : 'http';
    const host =
      process.env.NODE_ENV === 'production'
        ? req.headers.host
        : 'localhost:3000';
    const href = `${protocol}://${host}/email-confirmation/${verificationToken.token}`;

    const emailRes = await sendEmail({
      from: 'merntodoapp@example.com',
      to: `Michał Dziadkowiec <${user.email}>`,
      subject: 'Productive Todo App - Email verification',
      html: `${generateEmailVerificationTemplate(user.name, href)}`
    });

    if (emailRes) {
      console.log(
        `Verification email sent to ${user.email}. Code ${emailRes.statusCode} ${emailRes.statusMessage}`
      );
    }

    res.status(202).json({ msg: 'Confirmation email has been sent!' });

    return;
  } catch (error) {
    console.error(error.message);

    logSendEmailError(error);
    res.status(500).send('Server error!');
    return error;
  }
};
