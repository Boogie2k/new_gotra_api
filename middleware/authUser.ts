
import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
    user:object;
}


const authUser = (req:RequestWithUser, res:Response, next:NextFunction) => {
   if(req.user== undefined||req.user==null){
    return  res.status(401).json("unauthorizeddd");
    
    }
    
    next() 


    }

    module.exports = authUser;