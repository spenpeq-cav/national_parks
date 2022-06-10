require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const mongoose = require("./server-files/database/database.config");

const User = require("./server-files/models/user.models");

const userRouter = require("./server-files/routes/user.router");
const parkDataRouter = require("./server-files/routes/parkData.router");
const favoritesRouter = require("./server-files/routes/favorites.router");
const visitedRouter = require("./server-files/routes/visited.router");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

app.use(
  session({
    secret: process.env.SECRET,
    name: "natparks",
    cookie: {
      httpOnly: true,
      maxAge: 86400000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/user", userRouter);
app.use("/parks", parkDataRouter);
app.use("/favorites", favoritesRouter);
app.use("/visited", visitedRouter);

app.get("/api", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "Authenticated!" });
  } else {
    res.json({ message: "Not Authenticated!" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
