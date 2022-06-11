const express = require("express");

const {
  addVisited,
  removeVisited,
} = require("../controllers/visited.controller");

const visitedRouter = express.Router();

visitedRouter.put("/add", addVisited);
visitedRouter.patch("/remove", removeVisited);

module.exports = visitedRouter;
