const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const path = require("path");
const morgan = require("morgan");
const app = express();

const userRouter = require("./routes/userRoutes");
const dataRouter = require("./routes/dataRoutes");

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/data", dataRouter);

module.exports = app;
