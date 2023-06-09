const mongoose = require('mongoose')
const reactionSchema = require('./Reaction')
const dayjs = require('dayjs')

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
})

thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return dayjs(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = Thought