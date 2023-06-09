const { Thought, User } = require('../models')

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(400).json(err))
  },

  // Get thought by id
  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' })
        }
        res.json(thought)
      })
      .catch((err) => res.status(400).json(err))
  },

  // Create thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        )
      })
      .then(() => res.json({ message: 'Thought created successfully' }))
      .catch((err) => res.status(400).json(err))
  },

  // Update thought by id
  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' })
        }
        res.json({ message: 'Thought updated successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },

  // Delete thought by id
  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' })
        }
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: thought._id } },
          { new: true }
        )
      })
      .then(() => res.json({ message: 'Thought deleted successfully' }))
      .catch((err) => res.status(400).json(err))
  },

  // Add reaction to thought
  addReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' })
        }
        res.json({ message: 'Reaction added successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },

  // Remove reaction from thought
  removeReaction(req, res) {
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' })
        }
        res.json({ message: 'Reaction removed successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },
}

module.exports = thoughtController