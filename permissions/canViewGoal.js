"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const canViewGoal = (user, goal) => {
    //  return user._id === goal.author._id || user.role === "admin"
    return user.role === "admin" || goal.author.some(author => {
        const authorId = author._id.toString();
        const userId = user._id.toString();
        return authorId == userId;
    });
};
module.exports = canViewGoal;
