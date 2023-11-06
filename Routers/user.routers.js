const express = require("express");
const userRouter = express.Router();
const userService = require("../BL/user.services");
const { createToken, validToken, isDev } = require("../jwt");
const bcrypt = require("bcrypt");
const { sendMail } = require("../BL/email.services");

userRouter.post("/login", async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName,'+passwords');
    if(!bcrypt.compareSync(req.body.password,user.passwords )) throw 'password mismatch'
    const token = createToken(user.fullName, user.role);
    res.send({ user, token });
  } catch (err) {
    res.status(999).send(err);
  }
});

userRouter.put("/deleteuser", validToken, async (req, res) => {
  try {
    await userService.deleteUser(req.body);
    res.send("ok");
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/crateadmin", validToken, async (req, res) => {
  try {
    await userService.crateAdmin(req.body);
    res.send("ok");
  } catch (err) {
    res.status(999).send(err);
  }
});

userRouter.post("/userfromdev", validToken,isDev, async (req, res) => {
  try {
    const user = await userService.createUser(req.body, {organization:req.body.org});
    res.send({ user });
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});
userRouter.post("/userfromadmin", validToken, async (req, res) => {
  try {
    const user = await userService.createUser(req.body, req.userData);
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
userRouter.get("/allusersdev/:org", validToken,isDev, async (req, res) => {
  try {
    req.userData.organization = req.params.org
    const users = await userService.getAllUser(req.userData);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});
userRouter.put("/update", validToken, async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName);
    const updateUser = await userService.updateUser(user, {
      isActive: !user.isActive,
    });
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});

userRouter.put("/addposition", validToken, async (req, res) => {
  try {
    const updateUser = await userService.updateUser(req.body.user, {
      position: req.body.position,
    });
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/updatepassword", async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName);
    const passwords = bcrypt.hashSync(req.body.password, 10);
    const updateUser = await userService.updateUser(user, {
      passwords
    });
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/forgetpassword", async (req, res) => {
  try {
    const user = await userService.getUser(req.body.fullName)
    const code = await userService.forgetPassword(req.body.email);
    await userService.updateUser(user,{email:req.body.email})
    res.send({ code });
  } catch (err) {
    res.status(999).send(err);
  }
});
userRouter.put("/updateemail", validToken, async (req, res) => {
  try {
    const passwords = bcrypt.hashSync(req.body.password, 10);
    const updateUser = await userService.updateUser(req.body.user, {
      email: req.body.email,
      passwords,
    });
    const subject = "welcome to hamal";
    const html = `
    <div dir="RTL" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <p>ברוך הבא לחמל</p>
    <p>
    מנהל את כיתת הכוננות שלך
    </p>
    </div>`;
    await sendMail(updateUser.email, subject, html);
    res.send(updateUser);
  } catch (err) {
    res.status(999).send(err);
  }
});

module.exports = userRouter;
