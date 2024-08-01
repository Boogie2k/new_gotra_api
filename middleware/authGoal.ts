import{ Request, Response, NextFunction } from 'express';
import { Goal, User } from '../types';
const canViewGoal=require('../permissions/canViewGoal');

type RequestWithGoal = Request & { goal: Goal, user:User };

const authGoal = async (req: RequestWithGoal, res: Response, next: NextFunction) => {
    if(!canViewGoal(req.user, req.goal)){
        return res.status(401).json("Unauthorized");
    }

    next();

}

module.exports=authGoal