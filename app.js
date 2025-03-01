const express = require("express");
const app = express();
const mongooseconnection = require("./config/mongoose");

const userModel = require("./models/user");
const debuglog = require("debuglog")("development:app");

// Testing in postman
app.use(express.json());
app.use(express.urlencoded({ extende: true }));

//delete user
app.get("/delete/:username", async function (req, res) {
  let userDel = await userModel.findOneAndDelete({
    username: req.params.username,
  });
  res.send(userDel);
});

//User updation
app.get("/update/:username", async function (req, res) {
  let { name, username, email } = req.body;
  let userUp = await userModel.findOneAndUpdate(
    { username: req.params.username },
    { name, username, email },
    { new: true }
  );
  res.send(userUp);
});

// Users reading
app.get("/users", async function (req, res) {
  let users = await userModel.find();
  res.send(users);
});
app.get("/users/:username", async function (req, res) {
  let user = await userModel.findOne({ username: req.params.username });
  res.send(user);
});

// Users creation
app.post("/create", async function (req, res) {
  let { name, email, password, username } = req.body;
  let newCreatedUser = await userModel.create({
    name,
    username,
    email,
    password,
  });

  res.send(newCreatedUser);
});

//CRUD operations with mongo document
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

// sample user reading
app.get("/read", async function (req, res) {
  // let user = await userModel.findOne({ name: "Sajjad Afzaal" });
  let users = await userModel.find();

  debuglog("Users found");
  res.send(users);
});

// Sample user updation
app.get("/update", async function (req, res) {
  let updatedUser = await userModel.findOneAndUpdate(
    { name: "Sajjad Afzaal" },
    { name: "Muhammad Sajjad" },
    { new: true }
  );

  res.send(updatedUser);
});

// Sample user deletion
app.get("/delete", async function (req, res) {
  let deletedUser = await userModel.findOneAndDelete({
    name: "Muhammad Sajjad",
  });

  res.send(deletedUser);
});

// routes testing with errors handling
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
