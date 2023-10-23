const express = require("express");
const userRouter = express.Router();
const userService = require("../BL/user.services");
const { createToken, validToken } = require("../jwt");
userRouter.post("/login", async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName);
    const token = createToken(user.fullName,user.role)
    res.send({ user,token });
  } catch (err) {
    res.status(999).send(err)
  }
});
userRouter.post("/register", async (req, res) => {
  try {
    const user = await userService.createUser(
      req.body
    );
    const token = createToken(user.fullName,user.role)
    res.send({ user,token });
  } catch (err) {
    res.status(999).send(err)
  }
});
userRouter.get("/",validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.userData.fullName);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(999).send(err)
  }
});
userRouter.get("/allusers",validToken, async (req, res) => {
  try {
    if(req.userData.role!=='admin') throw 'you not allowed to get all users'
    const users = await userService.getAllUser();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(999).send(err)
  }
});
userRouter.put("/update",validToken,async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName);
    const updateUser = await userService.updateUser(user)
    console.log(updateUser);
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err)
  }
});

module.exports = userRouter;
