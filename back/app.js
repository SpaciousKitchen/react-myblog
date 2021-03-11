const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./models').sequelize;
const userRouter = require('./router/user');
const freepostRouter = require('./router/freepost');
const feedpostRouter = require('./router/feedpost');
const logger = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const { refererCheck } = require('./router/err');
const app = express();

const { NotlogInError, loginError, serverError } = require('./router/err');

app.use(logger('tiny'));

sequelize
  .sync()
  .then(() => {
    console.log('DB 연결중');
  })
  .catch(console.error);

app.use('/images', express.static(__dirname + '/uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //그냥폼 처리
app.use(cookieParser());
app.use(methodOverride());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(refererCheck);

app.use('/user', userRouter);
app.use('/post', freepostRouter);
app.use('/feedpost', feedpostRouter);

app.set('port', 3000);

app.use(NotlogInError, loginError, serverError);
app.listen(app.get('port'), async () => {
  console.log('서버 실행중');
});
