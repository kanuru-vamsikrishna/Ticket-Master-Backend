const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authenticate");
const User = require("../models/user");

// localhost:3031/register
router.post("/register", (req, res) => {
  const body = req.body;
  const user = new User(body);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});

// localhost:3031/login
router.post("/login", (req, res) => {
  const body = req.body;
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateToken();
    })
    .then((token) => {
      console.log(token);
      return res.json({ token });
    })
    .catch((err) => {
      res.json(err);
    });
});

// localhost:3031/user/account
router.get("/account", authenticateUser, (req, res) => {
  const { user } = req;
  User.findById(user._id)
    .then((user) => {
      res.status(200).json({
        status: 200,
        response: { _id: user._id, username: user.username, email: user.email },
        message: "Fetched User Successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to Fetch from DataBase",
      });
    });
});

// localhost:3031/user/logout
router.delete("/logout", authenticateUser, (req, res) => {
  const { user, token } = req;
  console.log(user, token);
  User.findByIdAndUpdate(user._id, { $pull: { tokens: { token: token } } })
    .then(() => {
      res.json({ notice: "successfully logged out" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

module.exports = router;
