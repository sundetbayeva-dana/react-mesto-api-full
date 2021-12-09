const router = require('express').Router();

const {
  getUser, getAllUsers, updateAvatar, updateUser, getUserInformation,
} = require('../controllers/users');

router.get('/users/me', getUserInformation);
router.get('/users', getAllUsers);
router.get('/users/:userId', getUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users/me', updateUser);

module.exports = router;
