const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./models').sequelize;
const userRouter = require('./router/user');
const postRouter = require('./router/post');
const logger = require('morgan');
const cors = require('cors');
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log('DB 연결중');
  })
  .catch(console.error);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('tiny'));

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(
  session({
    httpOnly: true,
    secure: true,
    secret: process.env.SECRET_KEY,
    resave: false,
    cookie: {
      httpOnly: true,
      Secure: true,
    },
  }),
);

app.use('/user', userRouter);
app.use('/post', postRouter);

app.set('port', 3000);

app.listen(app.get('port'), async () => {
  console.log('서버 실행중');
});
