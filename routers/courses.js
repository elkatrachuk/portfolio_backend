const { Router } = require("express");
const language = require("../models/language");
const Language = require("../models/").Language;
const Course = require("../models/").Course;

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
    const courses = await Course.findAll({ where: { languageId } });
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
      const course = await Course.findOne({ where: { id: courseId } });
      res.send(course);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
