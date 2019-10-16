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
      type: String
    }
  }
});

module.exports = User = mongoose.model('user', UserSchema);
