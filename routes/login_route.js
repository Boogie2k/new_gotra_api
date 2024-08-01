"use strict";
const express = require("express");
const loginRouter = express.Router();
const authUsers = require("../middleware/authUser");
const { login, getUsers, getSingleUser, deleteSingleUser, register, updateUser } = require("../controller/login_controller");
loginRouter.route("/login/").post(login).get(getUsers);
loginRouter.route("/login/:id").get(authUsers, getSingleUser).delete(authUsers, deleteSingleUser).patch(authUsers, updateUser);
loginRouter.route("/register").post(register);
module.exports = loginRouter;
