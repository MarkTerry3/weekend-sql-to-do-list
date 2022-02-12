const express = require("express");
const toDoRouter = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

module.exports = toDoRouter;