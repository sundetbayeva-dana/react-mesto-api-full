const router = require('express').Router();

const {
  createUser, getUser, getAllUsers, updateAvatar, updateUser,
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users/me', updateUser);

module.exports = router;
