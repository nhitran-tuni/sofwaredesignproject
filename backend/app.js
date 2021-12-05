// Set up mongodb
const config = require("./utils/constants.js");
const mongoose = require("mongoose");
mongoose
  .connect(config.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("connected to MongoDB");
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log("error connecting to MongoDB", err.message);
  });

const saveRouter = require("./controller/save");
const { fingridRouter } = require("./controller/fingrid.js");
const { fmiRouter } = require("./controller/fmi");
const middleware = require("./utils/middleware");
const express = require("express");
const app = express();
const cors = require("cors");
const combineRouter = require("./controller/combine.js");
require("express-async-errors");

app.use(cors());
app.use(express.json());

app.use("/save", saveRouter);
app.use(middleware.bodyExtractor);

app.use("/api/combine", combineRouter);
app.use("/api/fingrid", fingridRouter);
app.use("/api/fmi", fmiRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
