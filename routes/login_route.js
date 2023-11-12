const express = require("express");
const loginRouter = express.Router();

const {
  login,
  getUsers,
  getSingleUser,
  deleteSingleUser,
  register,
} = require("../controller/login_controller");

loginRouter.route("/login/").post(login).get(getUsers);
loginRouter.route("/login/:id").get(getSingleUser).delete(deleteSingleUser);
loginRouter.route("/register").post(register);

module.exports = loginRouter;
