const express = require("express");
const corsMiddleWare = require("cors");
const coursesRouter = require("./routers/courses");
const authRouter = require("./routers/auth");

const app = express();
const PORT = 4000;

app.use(corsMiddleWare());
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/auth", authRouter);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT);
