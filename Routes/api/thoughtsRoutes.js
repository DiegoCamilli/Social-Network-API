const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts')

// get thoughts
router.route('/').get(getAllThoughts).post(createThought)
// get one thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought)
// get reactions
router.route('/:id/reactions').post(addReaction)
// get one reaction
router.route('/:id/reaction/:reactionId').delete(deleteReaction)

module.exports = router