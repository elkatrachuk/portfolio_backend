const express = require("express");
const corsMiddleWare = require("cors");
const coursesRouter = require("./routers/courses");

const app = express();
const PORT = 4000;

app.use(corsMiddleWare());
app.use("/courses", coursesRouter);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT);
