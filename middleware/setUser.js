"use strict";
//import { Request, Response, NextFunction } from 'express';
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
const users = require('../Model/User_model');
const jwt = require('jsonwebtoken');
const setUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        let token;
        /* if(!authHeader){
          next(res.status(401).json({status: 'faileds', message: 'Unauthorized'}))
        }
         */
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            if (!token) {
                next(res.status(401).json({ status: 'failedss', message: 'Unauthorized no token' }));
            }
            token = jwt.verify(token, "boogieSecret");
            const user = yield users.findById(token.userId);
            if (!user) {
                console.log(token);
                next(res.status(404).json({ status: 'failedls', message: 'User not found', }));
            }
            req.user = user;
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failedis', message: error });
    }
});
module.exports = setUser;
