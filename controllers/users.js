const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { verifyConst } = require('../utils/const');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Unauthorized = require('../errors/unauthorized');
const Conflict = require('../errors/conflict');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      const newUser = User.create({
        name, about, avatar, email, password: hash,
      });
      return newUser;
    })
    .then((user) => {
      res.status(200).send({
        data: {
          name: user.name, about: user.about, avatar: user.avatar, email: user.email,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('При регистрации указан email, который уже существует на сервере'));
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные в метод создания пользователя'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: updatedAvatar });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные в метод обновления аватара пользователя'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные в метод обновления профиля пользователя'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, verifyConst, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).end();
    })
    .catch(() => {
      next(new Unauthorized('Неправильные почта или пароль'));
    });
};

const getUserInformation = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateAvatar,
  updateUser,
  login,
  getUserInformation,
};
