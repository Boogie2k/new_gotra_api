"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Goal = require("../Model/Goal_model");
const scopedGoals = require("../permissions/scopedGoals");
const createGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goal = yield Goal.create(req.body);
        if (req.body.title === "") {
            res.status(401).json("title is required");
            return;
        }
        else if (req.body.description === "") {
            res.status(401).json("description is required");
            return;
        }
        res.status(201).json(goal);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
const getGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goals = yield Goal.find().populate("author");
        if (goals.length === 0) {
            res.status(404).json("goals not found");
            //console.log(req.user)
            return;
        }
        // console.log(req.user)
        res.status(200).json(scopedGoals(req.user, goals));
    }
    catch (error) {
        console.log(error);
    }
});
const getGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const goal = yield Goal.findById(id);
        if (!goal) {
            res.status(404).json("goal not found");
            return;
        }
        res.status(200).json(goal);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
const deleteGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const goal = yield Goal.findByIdAndDelete(id);
        if (!goal) {
            res.status(404).json("goal not found");
            return;
        }
        res.status(200).json(goal);
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
const updateGoal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const itemID = yield Goal.findById(id);
        if (!itemID) {
            res.status(404).json("goal not found");
            return;
        }
        else if (req.body.title === "") {
            res.status(401).json("title is required");
            return;
        }
        else if (req.body.description === "") {
            res.status(401).json("description is required");
            return;
        }
        const updatedItem = yield Goal.findOneAndUpdate({ _id: itemID }, req.body, {
            new: true,
        });
        res.status(200).json(updatedItem);
    }
    catch (error) { }
});
module.exports = {
    createGoal,
    getGoals,
    getGoal,
    deleteGoal,
    updateGoal,
};
