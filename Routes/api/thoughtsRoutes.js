const express = require('express');
const router = express.Router()
const Thought = require('../../models')

// Get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find()
    res.json(thoughts)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Get a single thought by ID
router.get('/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id)
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' })
    }
    res.json(thought)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

// Create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body)
    res.status(201).json(newThought)
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' })
  }
})

// Update a thought
router.put('/thoughts/:id', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' })
    }
    res.json(updatedThought)
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' })
  }
})

// Delete a thought
router.delete('/thoughts/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndRemove(req.params.id)
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' })
    }
    res.json({ message: 'Thought deleted' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

module.exports = router