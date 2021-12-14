const Department = require("../models/department");

module.exports.list = (req, res) => {
  Department.find()
    .then((departments) => {
      return res.status(200).json({
        status: 200,
        response: departments,
        message: "Fetched Departments Successfully",
      });
    })
    .catch((err) => {
      return res.status(403).json({
        status: 403,
        response: err,
        message: "DataBase Error",
      });
    });
};

module.exports.create = (req, res) => {
  const body = req.body;
  const department = new Department(body);
  department
    .save()
    .then((department) => {
      return res.status(201).json({
        status: 201,
        response: department,
        message: "Department Created Successfully",
      });
    })
    .catch((err) => {
      return res.status(403).json({
        status: 403,
        response: err,
        message: "Error in Creating Department",
      });
    });
};

module.exports.read = (req, res) => {
  const id = req.params.id;
  Department.findById(id)
    .then((department) => {
      if (department) {
        res.json(department);
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
  Department.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    .then((department) => {
      if (department) {
        res.json(department);
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
  Department.findByIdAndDelete(id)
    .then((department) => {
      if (department) {
        res.json(department);
      } else {
        res.json({});
      }
    })
    .catch((err) => {
      res.json(err);
    });
};
