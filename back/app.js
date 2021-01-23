const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./models").sequelize;
const userRouter = require("./router/user");
const logger = require("morgan");
const cors = require("cors");
const app = express();

sequelize
  .sync()
  .then(() => {
    console.log("DB 연결중");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("tiny"));

app.use("/user", userRouter);

app.set("port", 3000);

app.listen(app.get("port"), async () => {
  console.log("서버 실행중");
});
