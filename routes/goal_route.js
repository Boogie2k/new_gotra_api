const express = require("express");
const {
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal,
} = require("../controller/goal_controller");

const goalRouter = express.Router();

goalRouter.route("/").post(createGoal).get(getGoals);
goalRouter.route("/:id").get(getGoal).delete(deleteGoal).patch(updateGoal);

module.exports = goalRouter;
