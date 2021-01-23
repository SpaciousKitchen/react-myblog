const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./models").sequelize;
const app = express();
sequelize
  .sync()
  .then(() => {
    console.log("DB 연결중");
  })
  .catch(console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Start");
});

app.set("port", 3000);

app.listen(app.get("port"), async () => {
  console.log("서버 실행중");
});
