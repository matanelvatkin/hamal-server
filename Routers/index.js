const express = require("express");
const userRouter = require("./user.routers");
const mainRouter = express.Router();

mainRouter.use("/user",userRouter)

module.exports = mainRouter