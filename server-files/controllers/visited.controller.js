const User = require("../models/user.models");

function addVisited(req, res) {
  const pc = req.body.pc;
  if (req.isAuthenticated()) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          { $push: { visited: pc } },
          { upsert: true, new: true },
          (err, model) => {
            console.log(err);
            return res.send(err);
          }
        );
      }
    });
  } else {
    return res.send("Not authenticated. Please Log in");
  }
}

function removeVisited(req, res) {
  const pc = req.body.pc;
  if (req.isAuthenticated()) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        User.findByIdAndUpdate(
          req.user._id,
          { $pull: { visited: pc } },
          { upsert: true, new: true },
          function (err, model) {
            console.log(err);
          }
        );
      }
    });
  } else {
    return res.send("Not authenticated. Please Log in");
  }
}

module.exports = {
  addVisited,
  removeVisited,
};
