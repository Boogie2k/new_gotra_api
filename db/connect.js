const mongoose = require("mongoose");

let connectDB = () => {
  mongoose.connect(process.env.MONG_URI).then(() => {
    console.log("ok");
  });
};

module.exports = connectDB;
