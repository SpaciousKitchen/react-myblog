const express = require("express");
const { User } = require("../models");
router = express.Router();

router.post("/login", async (req, res) => {
  console.log("login");
  console.log(req.body);

  const findResult = await User.findOne({
    where: { googleId: req.body.googleId },
  });
  if (!findResult) {
    const createResult = await User.create({
      googleId: req.body.googleId,
      name: req.body.name,
      email: req.body.email,
      img: req.body.img,
      logoUrl: req.body.logoUrl,
      option: req.body.option,
    });
    return res.send(createResult);
  } else {
    return res.send(findResult);
  }
});

module.exports = router;
