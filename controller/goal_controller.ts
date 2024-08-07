import { Request, Response } from "express";
const Goal = require("../Model/Goal_model");
const scopedGoals= require("../permissions/scopedGoals")

interface RequestWithUser extends Request { 
  user: object;
}

const createGoal = async (req:RequestWithUser, res:Response) => {

  try {
    const goal = await Goal.create(req.body);
    if (req.body.title === "") {
      
      res.status(401).json("title is required");
      return;
    } else if (req.body.description === "") {
      res.status(401).json("description is required");
      return;
    }
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getGoals = async (req:RequestWithUser, res:Response) => {
  try {
    const goals = await Goal.find().populate("author");

    if (goals.length === 0) {
      res.status(404).json("goals not found");
      
      //console.log(req.user)
      return;
    }

   // console.log(req.user)
    res.status(200).json(scopedGoals(req.user,goals));
  } catch (error) {
    console.log(error);
  }
};

const getGoal = async (req:RequestWithUser, res:Response) => {
  console.log(req.user)
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id).populate("author");

    if (!goal) {
      res.status(404).json("goal not found");
      return;
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const deleteGoal = async (req:RequestWithUser, res:Response) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByIdAndDelete(id);

    if (!goal) {
      res.status(404).json("goal not found");
      return;
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateGoal = async (req:RequestWithUser, res:Response) => {
  try {
    const { id } = req.params;

    const itemID = await Goal.findById(id);

    if (!itemID) {
      res.status(404).json("goal not found");
      return;
    } else if (req.body.title === "") {
      res.status(401).json("title is required");
      return;
    } else if (req.body.description === "") {
      res.status(401).json("description is required");
      return;
    }

    const updatedItem = await Goal.findOneAndUpdate({ _id: itemID }, req.body, {
      new: true,
    });

    res.status(200).json(updatedItem);
  } catch (error) {}
};

module.exports = {
  createGoal,
  getGoals,
  getGoal,
  deleteGoal,
  updateGoal,
};
