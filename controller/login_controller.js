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
const jwt = require("jsonwebtoken");
const User = require("../Model/User_model");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, username, password, role } = req.body;
        const newUser = User({
            username,
            email,
            password,
            role
        });
        const oldUser = yield User.findOne({ email });
        if (oldUser) {
            res.status(401).json("email is already in use");
            return;
        }
        yield newUser.save();
        const token = jwt.sign({
            userId: newUser._id,
            userEmail: newUser.email,
        }, "boogieSecret");
        res
            .status(200)
            .json({ userId: newUser.id, userEmail: newUser.email, token: token });
    }
    catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        const user = yield User.findOne({ email });
        if (!user || user.password !== password) {
            res.status(401).json("invalid credentials");
            return;
        }
        const token = jwt.sign({
            userId: user._id,
            userEmail: user.email,
            userName: user.username,
        }, "boogieSecret");
        res.status(200).json({
            userId: user._id,
            userEmail: user.email,
            userName: user.username,
            token: token,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({});
        res.json(users);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User.findOne({ email });
        if (!user) {
            res.json("user not found");
            return;
        }
        res.status(200).json(user);
    }
    catch (error) { }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield User.findOneAndDelete({ email });
        if (!user) {
            res.json("user removed");
            return;
        }
        res.json(JSON.parse(user));
    }
    catch (error) {
        res.json({
            success: false,
            msg: error,
        });
    }
});
module.exports = { login, getUsers, getSingleUser, deleteSingleUser, register };
