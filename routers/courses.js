const { Router } = require("express");
const Level = require("../models/").Level;
const Language = require("../models/").Language;
const Course = require("../models/").Course;
const Comment = require("../models/").Comment;
const User = require("../models/").User;
const authMiddleware = require("../middlewares/authMiddleware");
const UsersParticipant = require("../models").UsersParticipant;

const router = new Router();
const COURSES_LIST_LIMIT = 2;

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
    const { page = 1, limit = COURSES_LIST_LIMIT, filterValues } = req.query;
    const offset = (page - 1) * limit;
    let whereStatement = { languageId };
    if (filterValues) {
      const filters = JSON.parse(filterValues);
      const { rating, levelId } = filters;
      if (rating) {
        whereStatement.rating = rating;
      }
      if (levelId) {
        whereStatement.levelId = levelId;
      }
    }
    const allCourses = await Course.findAndCountAll({
      limit,
      offset,
      where: whereStatement,
    });
    res.send(allCourses);
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

router.post(
  "/languages/:languageId/courses/:courseId/become-participant",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const userId = req.user.id;
      // const course = await Course.findByPk(courseId);
      await UsersParticipant.create({ courseId, userId });
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

router.post(
  "/:courseId/add-comment",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { courseId, text } = req.body;
      const userId = req.user.id;
      await Comment.create({ courseId, userId, text });
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

module.exports = router;
