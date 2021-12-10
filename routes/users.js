const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUser, getAllUsers, updateAvatar, updateUser, getUserInformation,
} = require('../controllers/users');

router.get('/users/me', getUserInformation);
router.get('/users', getAllUsers);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
