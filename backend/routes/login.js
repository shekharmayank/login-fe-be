const express = require("express");

const router = express.Router();

router.post("/login", (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username == "username" && password == "password") {
      res.send({ msg: "Login successful" });
    } else {
      res.status(401).send({ msg: "Login failed" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
