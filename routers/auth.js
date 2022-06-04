const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/").User;
const { SALT_ROUNDS, SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

const router = new Router();

router.post("/signup", async (req, res, next) => {
  const { name, email, password, isAuthor } = req.body;
  const bcryptedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  try {
    const newUser = await User.create({
      name,
      email,
      password: bcryptedPassword,
      isAuthor,
    });
    delete newUser.dataValues.password;
    const token = jwt.sign({ userId: newUser.id }, SECRET, { expiresIn: "2h" });
    res.send({ newUser, token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
