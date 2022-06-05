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
    res.send({ user: newUser, token });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }
    delete user.dataValues["password"]; // don't send back the password hash
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "2h" });
    return res.status(200).send({ token, user: user.dataValues });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

module.exports = router;
