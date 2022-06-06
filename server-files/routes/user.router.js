const express = require("express");

const {
  getUser,
  userAuth,
  userLogout,
  userRegister,
  userLogin,
} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/auth", userAuth);
userRouter.get("/logout", userLogout);

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

module.exports = userRouter;
