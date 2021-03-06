const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const crypto = require('crypto');
const User = require('../models/User');
const Task = require('../models/Task');
const Preferences = require('../models/Preferences');
const Token = require('../models/Token');
const {
  generateEmailVerificationTemplate
} = require('../email-templates/email-verification');
const { sendEmail, logSendEmailError } = require('../utils/sendEmail');

exports.registerUser = async (req, res) => {
  const { email, password, passwordConfirm, name } = req.body;

  let createdUserId;

  try {
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

    createdUserId = user._id;

    // Create and save email verificaiton token
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

    console.log(
      `Verification email sent to ${user.email}. Code ${emailRes.statusCode} ${emailRes.statusMessage}`
    );

    const jwtPayload = {
      user: {
        id: user.id
      }
    };

    const preferences = new Preferences({
      user: user.id
    });

    await preferences.save();

    const token = jwt.sign(jwtPayload, config.get('mySecretJwt'), {
      expiresIn: 12 * 3600
    });

    res.status(200).json({ token });
    return;
  } catch (error) {
    console.error(error.message);

    if (createdUserId) {
      await User.findOneAndDelete({ _id: createdUserId });
      console.error(
        'User deleted directly in registration process because of server error'
      );
    }

    logSendEmailError(error);

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

/** --------- User projects controllers --------- */

exports.addProject = async (req, res) => {
  const project = req.body.project;
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

    if (user.projects.length >= 10)
      return res
        .status(400)
        .json({ errors: [{ msg: 'You can create up to 10 projects!' }] });

    if (user.projects.map(p => p.name).includes(project.name))
      return res.status(400).json({
        errors: [{ msg: `Project '${project.name}' already exist!` }]
      });

    const projectsLength = user.projects.push(project);
    const createdProject = user.projects[projectsLength - 1];

    await user.save();

    res.status(201).json(createdProject);

    return;
  } catch (error) {
    console.error(error);

    res.status(500).send('Server error!');
    return error;
  }
};

exports.removeProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    // Maybe it would work with selecting only 'labels' ??
    const user = await User.findById(req.user.id).select('projects');

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User not found!' }] });

    // TODO --> Try to simplify it
    const projectIndex = user.projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    // Find all User tasks where the label exists
    const userTasks = await Task.find({
      user: req.user.id,
      'project._id': projectId
    });

    // Remove the label from User labels
    user.projects.splice(projectIndex, 1);
    await user.save();

    if (userTasks) {
      // Remove the label from from these tasks
      userTasks.forEach(async task => {
        task.project = undefined;

        await task.save();
      });
    }

    res.status(200).json({
      removedProjectId: projectId,
      userProjects: user.projects
    });
    return userTasks;
  } catch (error) {
    console.error(error);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};

exports.updateProject = async (req, res) => {
  const projectId = req.params.projectId;
  const updatedProject = req.body.project;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!projectId)
    return res
      .status(400)
      .json({ errors: [{ msg: 'You need to pass project ID to delete it!' }] });
  try {
    const userProjects = await User.findOneAndUpdate(
      { _id: req.user.id, 'projects._id': projectId },
      {
        $set: {
          'projects.$.name': updatedProject.name,
          'projects.$.color': updatedProject.color
        }
      },
      { new: true }
    ).select('projects');

    if (!userProjects)
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    const modifiedProject = userProjects.projects.find(p => p.id === projectId);

    res.status(200).json(modifiedProject);

    return;
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId')
      return res.status(404).json({ errors: [{ msg: 'Project not found!' }] });

    res.status(500).send('Server error!');
    return error;
  }
};
