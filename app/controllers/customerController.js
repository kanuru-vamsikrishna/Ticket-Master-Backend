const Customer = require("../models/customer");

// customer list
module.exports.list = (req, res) => {
  Customer.find()
    .then((customers) => {
      return res.status(200).json({
        status: 200,
        response: customers,
        message: "fetched customers successfully",
      });
    })
    .catch((err) => {
      return res
        .status(403)
        .json({ status: 403, response: err, message: "Database error" });
    });
};

// create customer
module.exports.create = (req, res) => {
  const body = req.body;
  const customer = new Customer(body);
  customer
    .save()
    .then((customer) => {
      return res.status(201).json({
        status: 201,
        response: customer,
        message: "Customer created successfully",
      });
    })
    .catch((err) => {
      return res.status(403).json({
        status: 403,
        response: err,
        message: "Invalid Validation",
      });
    });
};

// get individual customer
module.exports.read = (req, res) => {
  const id = req.params.id;
  Customer.findById(id)
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      res.json(err);
    });
};

// edit customer
module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

// delete a customer
module.exports.delete = (req, res) => {
  const id = req.params.id;
  Customer.findByIdAndDelete(id)
    .then((customer) => {
      if (customer) {
        res.json(customer);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
