const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');
const { generateEmailVerificationTemplate } = require('../email-templates/email-verification');

const transport = nodemailer.createTransport(
  nodemailerSendgrid({
      apiKey: config.get('SENDGRID_API_KEY')
  })
);

exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server error!");
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
      return res.status(404).json({ errors: [{ msg: "User not found!" }] });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        errors: [{ msg: "Please, enter correct credientials!" }]
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({ errors: [{ msg: "Your account has not been verified. Please check your email!" }] })
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get("mySecretJwt"),
      { expiresIn: 12 * 3600 },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );
    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");

    return error;
  }
};

exports.emailConfirmation = async (req, res) => {
  try {
    const tokenQuery = req.query.token;

    if (!tokenQuery) {
      return res.status(400).json({
        errors: [{ msg: "Token not provided!" }]
      });
    }

    const token = await Token.findOne({ token: tokenQuery })

    if (!token) {
      return res.status(400).json({
        errors: [{ 
          tokenExpired: true,
          msg: "Token is not valid or has already expired!" }]
      });
    }

    const user = await User.findOne({ _id: token._userId });

    if (!user) {
      return res.status(400).json({
        errors: [{
          msg: "Token is not valid or has already expired!" }]
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        userVerified: user.isVerified
      })
    }

    user.isVerified = true;

    await user.save(); 
    
    res.status(200).json({
      userVerified: user.isVerified
    })

    return;
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!")
  }
}

exports.emailConfirmationResend = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

   const userEmail = req.body.email;

   const user = await User.findOne({ email: userEmail });

   if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found!" }] });
   }

   if (user.isVerified) {
      return res.status(404).json({ errors: [{ msg: "This account has already been verified. Please log in!" }] });
   }

   const verificationToken = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') } );
   await verificationToken.save();

   // Send an email with confirmation link
   const protocol = req.connection && req.connection.encrypted ? 'https' : 'http';
   const href = `${protocol}://${req.headers.host}/email-confirmation/${verificationToken.token}`;
   
   transport.sendMail({
     from: 'merntodoapp@example.com',
     to: `Michał Dziadkowiec <${user.email}>`,
     subject: 'Productive Todo App - Email verification',
     html: `${generateEmailVerificationTemplate(user.name, href)}`
   }).then(([res]) => {
     console.log(`Verification email sent to ${user.email}. Code ${res.statusCode} ${res.statusMessage}`);
   })
   .catch(err => {
     console.log('Errors occurred, failed to deliver verification email');
   
     if (err.response && err.response.body && err.response.body.errors) {
         err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
     } else {
         console.log(err);
     }
   });

   res.status(202).json({ msg: 'Confirmation email has been sent!' })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!")
  }
}
