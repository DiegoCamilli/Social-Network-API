const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/users')

// get users
router.route('/').get(getAllUsers).post(createUser)
// get one user
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)
// get friend (bonus)
router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router