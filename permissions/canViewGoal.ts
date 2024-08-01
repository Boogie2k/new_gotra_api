
import { User,Goal } from "../types";

const canViewDashboard = (user: User, goal: Goal) => {
  //  return user._id === goal.author._id || user.role === "admin";
    }

    module.exports = canViewDashboard;