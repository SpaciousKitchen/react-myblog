const express = require("express");

const app = express();

app.set("port", 3000);

app.get("/", (req, res) => {
  res.send("Hello Start");
});

app.listen(app.get("port"), async () => {
  console.log("서버 실행중");
});
