const express = require("express");

router = express.Router();

router.post("/login", (req, res) => {
  console.log("login");
  console.log(req.body);
  res.send("hi");
});

module.exports = router;
