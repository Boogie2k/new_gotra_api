import {Request,Response, NextFunction}from 'express';

interface RequestWithUser extends Request{
    user:{
        role:string;
        email:string;
    };
}

const authRoles = (role:string) => {
     console.log('p','o')
    return (req:RequestWithUser, res:Response, next:NextFunction) => {
       
        if(req.user.role !== role){
            return res.status(403).json("unauthorized, you are not allowed to access this route");
        }
     next()
    }
}

module.exports = authRoles; 