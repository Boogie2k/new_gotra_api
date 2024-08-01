"use strict";
const mongooseDB = require("mongoose");
let connectDB = () => {
    mongooseDB.set('strictQuery', true);
    mongooseDB.connect(process.env.MONG_URI).then(() => {
        console.log("ok");
    });
};
module.exports = connectDB;
