const mongoose = require("mongoose");
const DB_PASS = process.env.DB_PASS;

mongoose.connect(
  "mongodb+srv://spenUser:" +
    DB_PASS +
    "@cluster0.jneic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = {
  mongoose,
};
