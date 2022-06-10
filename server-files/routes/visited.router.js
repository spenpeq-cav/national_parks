const express = require("express");

const {
  addVisited,
  removeVisited,
} = require("../controllers/visited.controller");

const visitedRouter = express.Router();

visitedRouter.patch("/add", addVisited);
visitedRouter.patch("/remove", removeVisited);

module.exports = visitedRouter;
