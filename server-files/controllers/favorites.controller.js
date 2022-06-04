const passport = require("passport");
const User = require("../models/user.models");

function checkFavorite(req, res) {
  var alreadyAFavorite = false;
  const parkcode = req.body.parkcode;

  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        for (var i = 0; i < doc.favorites.length; i++) {
          if (doc.favorites[i] == parkcode) {
            alreadyAFavorite = true;
            res.send({ alreadyAFavorite: alreadyAFavorite, auth: true });
            break;
          }
        }
      }
    });
  } else {
    res.send({ alreadyAFavorite: false, auth: false });
  }
}

function favoriteAddOrRemove(req, res) {
  const alreadyAFavorite = req.body.alreadyAFavorite;

  if (req.isAuthenticated()) {
    User.findById(req.user._id, function (err, user) {
      if (err) {
        console.log(err);
      } else if (!alreadyAFavorite) {
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { favorites: req.body.parkCode } },
          { upsert: true, new: true },
          function (err, model) {
            console.log(err);
          }
        );
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          { $pull: { favorites: req.body.parkCode } },
          { upsert: true, new: true },
          function (err, model) {
            console.log(err);
          }
        );
      }
    });
  } else {
    res.send("Not Authenticated");
  }
}

module.exports = {
  checkFavorite,
  favoriteAddOrRemove,
};
