const mongoose = require("mongoose");
const debuglog = require("debug")("development:mongooseconfig");

mongoose.connect("mongodb://127.0.0.1:27017/testingdb");

const db = mongoose.connection;

db.on("error", function (err) {
  debuglog(err);
});

db.on("open", function () {
  debuglog("MongoDatabase Connected successfully");
});

// db.on("open", function () {
//   console.log("MongoDatabase Connected successfully");
// });

module.exports = db;
