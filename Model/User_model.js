const Mongoose = require("mongoose");
const registerSchema = new Mongoose.Schema(
  {
    email: { type: String },
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = Mongoose.model("User", registerSchema);
