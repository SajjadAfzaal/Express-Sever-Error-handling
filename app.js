const express = require("express");
const app = express();
const mongooseconnection = require("./config/mongoose");

const userModel = require("./models/user");
const debuglog = require("debuglog")("development:app");

// User model creation sample
app.get("/create", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "Sajjad123",
    name: "Sajjad Afzaal",
    email: "sajjad@hotmail",
    password: "pass1234",
  });

  debuglog("User Created");
  res.send(createdUser);
});

let data = [1, 2, 3, 4, 5];

app.get("/", function (req, res, next) {
  try {
    res.send("Hello World!");
  } catch (err) {
    next(err);
  }
});

app.post("/enter/:number", (req, res) => {
  data.push(parseInt(req.params.number));
  res.send(data);
});

//Error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// Server checking
app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
