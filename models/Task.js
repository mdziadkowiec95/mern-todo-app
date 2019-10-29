const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date
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
  project: {
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    name: {
      type: String
    },
    color: {
      type: String
    }
  },
  priority: {
    type: String,
    default: 'normal' // ['low', 'normal', 'high']
  },
  status: {
    type: String,
    default: 'inbox' // ['inbox', 'active']
  }
});

// Validators
TaskSchema.path('labels').validate(function(labels) {
  return labels.length <= 3;
}, 'Single task can be associated with up to 3 labels!');

module.exports = Task = mongoose.model('task', TaskSchema);
