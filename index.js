const express = require("express");
const setupDB = require("./config/database");
const cors = require("cors");
const router = require("./config/routes");
const usersRouter = require("./app/controllers/usersController");
const app = express();

const port = 3031;

app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/users", usersRouter);

setupDB();

app.listen(port, () => {
  console.log("listening on the port", port);
});
