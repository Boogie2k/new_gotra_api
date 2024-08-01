import {Request,Response,NextFunction} from 'express';
const jwt = require('jsonwebtoken');
const User = require('../Model/User_model');
const Goal = require('../Model/Goal_model');
const canViewGoal = require('../permissions/canViewGoal');

interface RequestWithUser extends Request {
    user: object;
    goal: object;
}

const setGoal = async (req:RequestWithUser,res:Response,next:NextFunction) => {
try{
    const goalId = req.params.id;
    const goal = await Goal.findById(goalId).populate('author');
    if(!goal){
        return res.status(404).json({status: 'failed', message: 'Goal not found'});
    }



    req.goal = goal;

    next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 'failedis', message: error});
    }
}

module.exports = setGoal;