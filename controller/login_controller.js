const jwt = require("jsonwebtoken");
const User = require("../Model/User_model");

const register = async (req, res) => {
  try {
    let { email, username, password } = req.body;

    const newUser = User({
      username,
      email,
      password,
    });

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      res.status(401).json("email is already in use");
      return;
    }
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        userEmail: newUser.email,
      },
      "boogieSecret"
    );

    res
      .status(200)
      .json({ userId: newUser.id, userEmail: newUser.email, token: token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const User = await User.findOne({ email });
    if (!User || User.password !== password) {
      res.json("invalid credentials");
      return;
    }
    const token = jwt.sign(
      {
        userId: User._id,
        userEmail: User.email,
        userName: User.username,
      },
      "boogieSecret"
    );
    res.status(200).json({
      userId: User.id,
      userEmail: User.email,
      userName: User.username,
      token: token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json("user not found");
      return;
    }
    res.status(200).json(user);
  } catch (error) {}
};

const deleteSingleUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      res.json("user removed");
      return;
    }
    res.json(JSON.parse(user));
  } catch (error) {
    res.json({
      success: false,
      msg: error,
    });
  }
};

module.exports = { login, getUsers, getSingleUser, deleteSingleUser, register };
