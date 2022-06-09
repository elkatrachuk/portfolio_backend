const { SECRET } = require("../config/constants");
const jwt = require("jsonwebtoken");

const User = require("../models").User;
const Course = require("../models").Course;

const auth = async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (!auth || !(auth[0] === "Bearer") || !auth[1]) {
    return res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  try {
    // const data = (auth[1]);
    const data = jwt.verify(auth[1], SECRET);
    const user = await User.findByPk(data.userId, {
      include: [{ model: Course, foreignKey: "userId", as: "author" }],
    });
    if (!user) {
      return res.status(404).send({ message: "User does not exist" });
    }

    // add user object to request
    req.user = user;
    // next handler
    return next();
  } catch (error) {
    console.log("ERROR IN AUTH MIDDLEWARE", error);

    switch (error.name) {
      case "TokenExpiredError":
        return res
          .status(401)
          .send({ error: error.name, message: error.message });

      case "JsonWebTokenError":
        return res
          .status(400)
          .send({ error: error.name, message: error.message });

      default:
        return res.status(400).send({
          message: "Something went wrong, sorry",
        });
    }
  }
};

module.exports = auth;
