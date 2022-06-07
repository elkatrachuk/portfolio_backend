const { Router } = require("express");
const Level = require("../models/").Level;
const Language = require("../models/").Language;
const Course = require("../models/").Course;
const Comment = require("../models/").Comment;
const User = require("../models/").User;
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.get("/languages", async (req, res, next) => {
  try {
    const languages = await Language.findAll();
    res.send(languages);
  } catch (e) {
    next(e);
  }
});

router.get("/languages/:languageId", async (req, res, next) => {
  const { languageId } = req.params;
  try {
    const { page = 1, limit = 2 } = req.query;
    const offset = page * limit;
    let courses;
    courses = await Course.findAndCountAll({
      limit,
      offset,
      where: { languageId },
    });
    res.send(courses);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/languages/:languageId/courses/:courseId",
  async (req, res, next) => {
    const { courseId } = req.params;
    try {
      const course = await Course.findOne({
        where: { id: courseId },
        include: [
          { model: Level },
          { model: Language },
          { model: Comment, include: User },
          { model: User, as: "author" },
          { model: User, as: "participant" },
        ],
      });
      res.send(course);
    } catch (e) {
      next(e);
    }
  }
);

router.post("/create-new-course", authMiddleware, async (req, res, next) => {
  try {
    const { language, title, description, level, imageUrl } = req.body;
    const newCourse = await Course.create({
      languageId: language,
      title,
      description,
      levelId: level,
      imageUrl,
      rating: 0,
      userId: req.user.id,
    });

    res.send({ newCourse, user: req.user });
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/languages/:languageId/courses/:courseId",
  async (req, res, next) => {
    try {
      const { languageId, courseId } = req.params;
      const { rating } = req.body;
      const course = await Course.findByPk(courseId);
      await course.update({ rating });
      res.send(course);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
