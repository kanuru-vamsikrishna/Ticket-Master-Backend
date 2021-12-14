const Tickets = require("../models/tickets");

module.exports.list = (req, res) => {
  Tickets.find()
    .populate(["employees", "department", "customer"])
    .then((ticket) => {
      return res.status(200).json({
        status: 200,
        response: ticket,
        message: "Fetched Tickets Successfully",
      });
    })
    .catch((err) => {
      return res.status(403).json({
        status: 403,
        response: err,
        message: " Unable to Fetch data from DataBase",
      });
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  const ticket = new Tickets(body);
  ticket
    .save()
    .then((ticket) => {
      res.status(200).json({
        status: 200,
        response: ticket,
        message: "Created Ticket Successfully",
      });
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to create ticket",
      });
    });
};

module.exports.read = (req, res) => {
  const id = req.params.id;
  Tickets.findById(id)
    .populate(["employees", "department", "customer"])
    .then((ticket) => {
      if (ticket) {
        res.status(200).json({
          status: 200,
          response: ticket,
          message: "Fetching Tickets Successfully",
        });
      } else {
        res.status(403).json({
          status: 403,
          response: {},
          message: "Couldn't find a Ticket",
        });
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to find Ticket",
      });
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Tickets.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .populate(["employees", "department", "customer"])
    .then((ticket) => {
      if (ticket) {
        res.status(200).json({
          status: 200,
          response: ticket,
          message: "Updated ticket successfully",
        });
      } else {
        res.status(403).json({
          status: 403,
          response: {},
          message: "Couldn't update a ticket",
        });
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to update a ticket",
      });
    });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  Tickets.findByIdAndDelete(id)
    .then((ticket) => {
      if (ticket) {
        res.status(200).json({
          status: 200,
          response: ticket,
          message: "Removed a ticket successfully",
        });
      } else {
        res.status(403).json({
          status: 403,
          response: {},
          message: "couldn't delete a ticket",
        });
      }
    })
    .catch((err) => {
      res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to delete a ticket",
      });
    });
};
