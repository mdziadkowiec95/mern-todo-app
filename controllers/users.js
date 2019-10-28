const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/User');
const Task = require('../models/Task');

exports.registerUser = async (req, res) => {
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

    const token = jwt.sign(jwtPayload, config.get('mySecretJwt'), {
      expiresIn: 12 * 3600
    });

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.log(error);

    res.status(500).send('Server error!');
    return error;
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });

    const oldPasswordMatch = bcrypt.compareSync(oldPassword, user.password);

    if (!oldPasswordMatch)
      return res.status(401).json({
        errors: [{ msg: `Old password does not match User's passowrd!` }]
      });

    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(newPassword, salt);

    await user.save();

    res.status(200).json({ msg: 'Password has been changed!' });

    return;
  } catch (error) {
    console.error(error.message);

    res.status(500).send('Server error!');
  }
};

exports.addLabel = async (req, res) => {
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
};

exports.removeLabel = async (req, res) => {
  try {
    const labelId = req.params.labelId;

    // Maybe it would work with selecting only 'labels' ??
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
};
