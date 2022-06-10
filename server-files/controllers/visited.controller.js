const User = require("../models/user.models");

function addVisited(req, res) {
  //TODO
  const pc = req.body.pc;
  console.log("Add visited");
  console.log(pc);
  return res.json({ code: pc });
}

function removeVisited(req, res) {
  //TODO
  const pc = req.body.pc;
  console.log("Remove visited");
  console.log(pc);
  return res.json({ code: pc });
}

module.exports = {
  addVisited,
  removeVisited,
};
