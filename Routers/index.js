const express = require("express");
const userRouter = require("./user.routers");
const positionRouter = require("./position.routers");
const organizationRouter = require("./organization.routers");
const mainRouter = express.Router();

mainRouter.use("/user",userRouter)
mainRouter.use("/position",positionRouter)
mainRouter.use("/organization",organizationRouter)

module.exports = mainRouter