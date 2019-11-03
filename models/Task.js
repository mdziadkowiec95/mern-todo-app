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
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  status: {
    type: String,
    enum: ['inbox', 'active'],
    default: 'inbox'
  }
});

// Validators
TaskSchema.path('labels').validate(function(labels) {
  return labels.length <= 3;
}, 'Single task can be associated with up to 3 labels!');

TaskSchema.path('status').validate(function(status) {
  if (status === 'inbox') {
    return !this.date;
  }

  if (status === 'active') {
    return this.date;
  }
}, `Inbox tasks can't have date. Active tasks should have date specified!`);

module.exports = Task = mongoose.model('task', TaskSchema);
