"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scopedGoals = (user, goals) => {
    if (user.role === 'admin') {
        return goals;
    }
    const scopedGoals = goals.filter(goal => goal.author.some(author => {
        const authorId = author._id.toString();
        const userId = user._id.toString();
        return authorId == userId;
    }));
    return scopedGoals;
};
module.exports = scopedGoals;
