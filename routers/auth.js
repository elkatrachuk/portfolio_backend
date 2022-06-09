const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/").User;
const { SALT_ROUNDS, SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password, isAuthor } = req.body;
    const bcryptedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
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

router.patch("/update-profile", authMiddleware, async (req, res, next) => {
  try {
    const { avatar, description, isAuthor } = req.body;
    const profile = await User.findByPk(req.user.id);
    await profile.update({ avatar, description, isAuthor });
    res.send(profile);
  } catch (error) {
    next(error);
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;
