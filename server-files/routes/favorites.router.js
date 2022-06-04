const express = require("express");

const favoritesController = require("../controllers/favorites.controller");

const favoritesRouter = express.Router();

favoritesRouter.post("/check", favoritesController.checkFavorite);
favoritesRouter.post("/addOrRemove", favoritesController.favoriteAddOrRemove);

module.exports = favoritesRouter;
