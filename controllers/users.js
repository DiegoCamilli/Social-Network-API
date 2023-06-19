const { User } = require('../models')

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err))
  },

  // Get user by id
  getUserById(req, res) {
    User.findById(req.params.id)
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        res.json(user)
      })
      .catch((err) => res.status(400).json(err))
  },

  // Create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json({ message: 'User created successfully' }))
      .catch((err) => res.status(400).json(err))
  },

  // Update user by id
  updateUser(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'User updated successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },

  // Delete user by id
  deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        return User.updateMany(
          { _id: { $in: user.friends } },
          { $pull: { friends: req.params.userId } }
        )
      })
      .then(() => res.json({ message: 'User deleted successfully' }))
      .catch((err) => res.status(400).json(err))
  },

  // Add friend to user
  addFriend(req, res) {
    // const savingTheIdBecauseJavascriptIsVerySilly = req.params.userId
    User.findByIdAndUpdate(
      req.params.id,
      { $push: { friends: req.params.id } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'Friend added successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },

  // Remove friend from user
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' })
        }
        res.json({ message: 'Friend removed successfully' })
      })
      .catch((err) => res.status(400).json(err))
  },
}

module.exports = userController