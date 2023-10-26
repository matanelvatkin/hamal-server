const express = require("express");
const userRouter = require("./user.routers");
const positionRouter = require("./position.routers");
const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/position",positionRouter)

module.exports = mainRouter