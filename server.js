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
const express = require("express");
const cors = require("cors");
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
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/v1", Login);
//app.use("/register", registers);
app.use("/api/v1/goal", Goal);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        connect(process.env.MONG_URI);
        app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
    }
    catch (err) {
        console.log(err);
    }
});
start();
