const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => {
      throw new BadRequest('Переданы некорректные данные в метод создания карточки');
    })
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then(({ owner }) => {
      if (owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId)
          .then((deletedCard) => {
            if (!deletedCard) {
              throw new NotFoundError('Карточка не найдена');
            }
            res.status(200).send('Пост удален');
          })
          .catch(next);
      } else {
        throw new Forbidden('Попытка удалить чужую карточку');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.status(200).send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
