const express = require("express");
const router = express.Router();
const  { authenticateUser } = require('../app/middlewares/authenticate')
const customerController = require("../app/controllers/customerController");
const departmentController = require("../app/controllers/departmentController");
const employeeController = require('../app/controllers/employeeController')
const ticketController = require('../app/controllers/ticketController')

router.get("/customers", authenticateUser, customerController.list);
router.post("/customers", authenticateUser, customerController.create);
router.get("/customers/:id",authenticateUser, customerController.read);
router.put("/customers/:id", authenticateUser,customerController.update);
router.delete("/customers/:id",authenticateUser, customerController.delete);

router.get("/departments", authenticateUser, departmentController.list);
router.post("/departments", authenticateUser,departmentController.create);
router.get("/departments/:id", authenticateUser,departmentController.read);
router.put("/departments/:id", authenticateUser, departmentController.update);
router.delete("/departments/:id",authenticateUser, departmentController.delete);

router.get('/employees', authenticateUser, employeeController.list) 
router.post('/employees', authenticateUser, employeeController.create)
router.get('/employees/:id', authenticateUser, employeeController.read)
router.put('/employees/:id', authenticateUser, employeeController.update)
router.delete('/employees/:id', authenticateUser, employeeController.delete)

router.get('/tickets', authenticateUser, ticketController.list)
router.post('/tickets', authenticateUser, ticketController.create)
router.get('/tickets/:id', authenticateUser, ticketController.read)
router.put('/tickets/:id', authenticateUser, ticketController.update)
router.delete('/tickets/:id', authenticateUser, ticketController.delete) 

module.exports = router;
