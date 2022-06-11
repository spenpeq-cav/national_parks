const passport = require("passport");
const User = require("../models/user.models");
const express = require("express");

function getUser(req, res) {
  res.send(req.user);
}

function userAuth(req, res) {
  if (req.isAuthenticated()) {
    res.json({ auth: true });
  } else {
    res.json({ auth: false });
  }
}

function userLogout(req, res) {
  req.logOut();
  req.session.destroy();
  res.clearCookie("natparks", {
    path: "/",
    httpOnly: true,
    secure: "none",
    sameSite: "none",
    expires: new Date(1),
  });
  req.session.destroy();
}

function userRegister(req, res) {
  User.findOne({ username: req.body.username }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    if (doc) {
      res.send({ msg: "User with that email already exists" });
    }
    if (!doc) {
      User.register(
        {
          username: req.body.username,
          first: req.body.first,
          last: req.body.last,
        },
        req.body.password,
        function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/register");
          }

          passport.authenticate("local")(req, res, function () {
            res.send(user);
          });
          // else {
          //     res.redirect("/login")
          //     passport.authenticate("local")(req, res, function(){
          //         console.log(res)
          //         res.redirect("/profile")
          //     })
          // }
        }
      );
    }
  });
}

function userLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (!user) {
      res.send({ msg: "No user with that email exist." });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
        }
        res.send({
          user: {
            username: user.username,
            first: user.first,
            last: user.last,
            favorites: user.favorites,
            visited: user.visited,
          },
        });
      });
    }
  })(req, res, next);
}

module.exports = {
  getUser,
  userAuth,
  userLogout,
  userRegister,
  userLogin,
};
