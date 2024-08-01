const appRouter = require("express");
const {
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal,
} = require("../controller/goal_controller");
const authUser =require("../middleware/authUser")
const authRoles = require("../middleware/authRoles"); 
const setGoal = require("../middleware/setGoal");
const authGoal = require("../middleware/authGoal");

const goalRouter= appRouter.Router();



goalRouter.route("/").post(authUser, createGoal);
goalRouter.get("/", authUser, getGoals);

goalRouter
  .route("/:id")
  .get(authUser, setGoal,authGoal, getGoal)
  .delete(authUser, setGoal,authGoal, deleteGoal)
  .patch(authUser, setGoal,authGoal, updateGoal);



module.exports = goalRouter;
 