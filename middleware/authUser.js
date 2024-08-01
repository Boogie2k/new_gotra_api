"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authUser = (req, res, next) => {
    if (req.user == undefined || req.user == null) {
        return res.status(401).json("unauthorizeddd");
    }
    next();
};
module.exports = authUser;
