//import { Request, Response, NextFunction } from 'express';

import { MongooseOptions, SchemaOptions,QueryOptions,Query } from 'mongoose'


const users = require('../Model/User_model')
const jwt = require('jsonwebtoken')

import { Request, Response, NextFunction } from 'express'

type RequestWithUser = Request & {user: object} 

const setUser = async (req :RequestWithUser , res :Response , next :NextFunction )=>{
  try {
    
    const authHeader = req.headers.authorization;
  let token:any
  /* if(!authHeader){
    next(res.status(401).json({status: 'faileds', message: 'Unauthorized'}))
  }
   */
  if(authHeader && authHeader.startsWith('Bearer')){
    token = authHeader.split(' ')[1]

    if(!token){
      next(res.status(401).json({status: 'failedss', message: 'Unauthorized no token'}))
    }
  

  token = jwt.verify(token, "boogieSecret")
  const user= await users.findById(token.userId)

  if(!user){ 
    console.log(token)
    next(res.status(404).json({status: 'failedls', message: 'User not found',}))
    
  }

   req.user = user


 
  
}

next() 
  } catch (error) {
    console.log(error)
    return res.status(500).json({status: 'failedis', message: error})
    
  }
  

 
}

module.exports = setUser