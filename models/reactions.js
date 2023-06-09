const mongoose = require('mongoose')
const dayjs = require('dayjs')

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

reactionSchema.virtual('formattedCreatedAt').get(function () {
  return dayjs(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
})

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction