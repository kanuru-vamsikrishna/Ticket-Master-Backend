const Employees = require("../models/employees");

module.exports.list = (req, res) => {
  Employees.find()
    .populate("department")
    .then((employee) => {
      return res.status(200).json({
        status: 200,
        response: employee,
        message: "Fetched Employees Successfully",
      });
    })
    .catch((err) => {
      return res.status(403).json({
        status: 403,
        response: err,
        message: "Unable to Fetch from DataBase",
      });
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  const employee = new Employees(body);
  employee
    .save()
    .then((employee) => {
      res.json(employee);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.read = (req, res) => {
  const id = req.params.id;
  Employees.findById(id)
    .populate("department")
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Employees.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.delete = (req, res) => {
  const id = req.params.id;
  Employees.findByIdAndDelete(id)
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
