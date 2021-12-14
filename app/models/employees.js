const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
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
        return "Ivalid email entered";
      },
    },
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    maxlength: 10,
  },
});

const Employees = mongoose.model("Employees", EmployeeSchema);

module.exports = Employees;
