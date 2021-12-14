const mongoose = require("mongoose");
const validator = require("validator");

// Schema
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: function () {
        return "Email format is not correct";
      },
    },
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    maxlength: 10,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
