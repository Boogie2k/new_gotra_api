"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authRoles = (role) => {
    console.log('p', 'o');
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json("unauthorized, you are not allowed to access this route");
        }
        next();
    };
};
module.exports = authRoles;
