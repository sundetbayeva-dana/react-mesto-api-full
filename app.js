const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { NOT_FOUND_CODE } = require('./utils/const');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Запрос несуществующей страницы' });
});

app.listen(PORT);
