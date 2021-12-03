/* eslint no-underscore-dangle: ["error", { "allow": ["foo_", "_bar", _id] }] */
const User = require('../models/user');
const { ERROR_CODE, NOT_FOUND_CODE, SERVER_ERROR_CODE } = require('../utils/const');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send(({ message: ' Переданы некорректные данные при создании' }));
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(() => res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((updatedAvatar) => res.status(200).send({ data: updatedAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send(({ message: ' Переданы некорректные данные при обновлении аватара' }));
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send(({ message: ' Переданы некорректные данные при обновлении профиля' }));
        return;
      }
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(SERVER_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
    });
};
module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateAvatar,
  updateUser,
};
