const { Router } = require("express");
const Language = require("../models/").Language;

const router = new Router();

router.get("/languages", async (req, res, next) => {
  try {
    const languages = await Language.findAll();
    res.send(languages);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
