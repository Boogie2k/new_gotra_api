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
const jwt = require('jsonwebtoken');
const User = require('../Model/User_model');
const Goal = require('../Model/Goal_model');
const setGoal = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const goalId = req.params.id;
        const goal = yield Goal.findById(goalId);
        if (!goal) {
            return res.status(404).json({ status: 'failed', message: 'Goal not found' });
        }
        req.goal = goal;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failedis', message: error });
    }
});
