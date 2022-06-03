const express = require("express");

const parkDataController = require("../controllers/parkData.controller");

const parkDataRouter = express.Router();


parkDataRouter.get("/popular", parkDataController.getParkDataPopular);
parkDataRouter.get("/explore", parkDataController.getParkDataExplore);
parkDataRouter.get("/:parkCode", parkDataController.getParkData);


module.exports = parkDataRouter;
