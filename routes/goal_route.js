"use strict";
const appRouter = require("express");
const { createGoal, getGoals, getGoal, deleteGoal, updateGoal, } = require("../controller/goal_controller");
const authUser = require("../middleware/authUser");
const authRoles = require("../middleware/authRoles");
const goalRouter = appRouter.Router();
goalRouter.route("/").post(authUser, createGoal);
goalRouter.get("/", authUser, getGoals);
goalRouter
    .route("/:id")
    .get(authUser, getGoal)
    .delete(authUser, authRoles("admin"), deleteGoal)
    .patch(authUser, updateGoal);
module.exports = goalRouter;
