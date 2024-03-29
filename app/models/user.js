const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "Email Format is not correct";
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  tokens: [
    {
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// pre hooks
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew) {
    bcryptjs
      .genSalt(10)
      .then((salt) => {
        bcryptjs
          .hash(user.password, salt)
          .then((encryptedPassword) => {
            user.password = encryptedPassword;
            next();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    next();
  }
});

// statics methods
userSchema.statics.findByCredentials = function (email, password) {
  const User = this;
  return User.findOne({ email }).then((user) => {
    console.log("HIe");
    if (!user) {
      return Promise.reject("invalid email/password");
    }
    return bcryptjs.compare(password, user.password).then((result) => {
      if (result) {
        console.log("Here");
        return Promise.resolve(user);
      } else {
        return Promise.reject("invalid email/password");
      }
    });
  });
};

// instance methods
userSchema.methods.generateToken = function () {
  const user = this;
  const tokenData = {
    _id: user._id,
    username: user.username,
    createdAt: Number(new Date()),
  };
  const token = jwt.sign(tokenData, "jwt@1234");
  user.tokens.push({
    token,
  });
  return user
    .save()
    .then((user) => {
      return Promise.resolve(token);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

userSchema.statics.findByToken = function (token) {
  const User = this;
  let tokenData;
  try {
    tokenData = jwt.verify(token, "jwt@1234");
    return Promise.resolve(tokenData);
  } catch (err) {
    return Promise.reject(err);
  }
  return User.findOne({
    _id: tokenData._id,
    "tokens.token": token,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
