const express = require("express");
const userRouter = express.Router();
const userService = require("../BL/user.services");
const { createToken, validToken } = require("../jwt");
userRouter.post("/login", async (req, res) => {
  try {
    const user = await userService.getUser(req.body.user);
    const token = createToken(user.fullName, user.role);
    res.send({ user, token });
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/deleteuser",validToken, async (req, res) => {
  try {
    await userService.deleteUser(req.body);
    res.send('ok');
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/crateadmin",validToken, async (req, res) => {
  try {
    await userService.crateAdmin(req.body);
    res.send('ok');
  } catch (err) {
    res.status(999).send(err);
  }
});

userRouter.post("/userfromadmin",validToken, async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});

userRouter.get("/", validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.userData.fullName);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});
userRouter.get("/allusers", validToken, async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});
userRouter.put("/update", validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName);
    const updateUser = await userService.updateUser(user);
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});

userRouter.put("/addposition", validToken, async (req, res) => {
  try {
    const updateUser = await userService.addPosition(req.body.user,req.body.position);
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});

module.exports = userRouter;
