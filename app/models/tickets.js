const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  department: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  employees: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Employees",
    },
  ],
  message: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Tickets = mongoose.model("Tickets", ticketSchema);

module.exports = Tickets;
