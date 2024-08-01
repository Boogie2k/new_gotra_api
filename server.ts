
import { Request, Response } from "express";
const express = require("express");
const cors = require("cors")
//const registers = require("./routes/register_route");
const Login = require("./routes/login_route");
const Goal = require("./routes/goal_route");

const setUser = require("./middleware/setUser");
const connect = require("./db/connect");
require("dotenv").config();


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use(setUser);

 app.get("/", (req:Request, res:Response) => {
  res.send("Hello World!");
}); 

app.use("/api/v1", Login);


//app.use("/register", registers);

app.use("/api/v1/goal", Goal);


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
