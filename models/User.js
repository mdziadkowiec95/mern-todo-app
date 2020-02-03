const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String
  },
  labels: [
    {
      name: {
        type: String
      },
      color: {
        type: String
      }
    }
  ],
  projects: [
    {
      name: {
        type: String
      },
      color: {
        type: String
      }
    }
  ],
  preferences: {
    themeColor: {
      type: String
    },
    defaultView: {
      type: String,
      enum: ['inbox', 'today', 'week'],
      default: 'today'
    },
    dailyGoal: {
      type: Number
    },
    weeklyGoal: {
      type: Number
    }
  }
});

// Validators
UserSchema.path('labels').validate(function(labels) {
  return labels.length <= 10;
}, 'User can create up to 10 labels!');

UserSchema.path('projects').validate(function(projects) {
  return projects.length <= 10;
}, 'User can create up to 10 projects!');

const tokenSchema = new mongoose.Schema({
  _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = User = mongoose.model('user', UserSchema);
