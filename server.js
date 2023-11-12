const express = require("express");
//const cors = require("cors")
//const registers = require("./routes/register_route");
const Login = require("./routes/login_route");
const Goal = require("./routes/goal_route");
const connect = require("./db/connect");
require("dotenv").config();

const app = express();
const port = 3000;

//app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//app.use("/register", registers);
app.use("/api/v1", Login);
app.use("/api/v1/goal", Goal);
//app.use(express.json());

const start = async () => {
  try {
    connect(process.env.MONG_URI);
    app.listen(port, () =>
      console.log(`Example app listening on port http://localhost:${port}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
