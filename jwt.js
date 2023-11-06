const jwt = require("jsonwebtoken");
const userController = require("./DL/user.controller");
const secret = process.env.SECRET;

const createToken = (fullName, role) => {
  const token = jwt.sign({ fullName, role }, secret);
  if (!token) throw "can not create token";
  return token;
};

const validToken = async (req, res, next) => {
  try {
    var result = jwt.verify(
      req.headers.authorization.replace("Bearer ", ""),
      secret
    );
    if (!result.fullName) throw "user not recognized";
    req.userData = await userController.readOne({
      fullName: result.fullName,
      isDelete: false,
    });
    next();
  } catch (err) {
    res.status(403).send(err);
  }
};

const isDev = async (req, res, next) => {
  if (req.userData.role === "developer") next();
  else res.status(403).send("you not allude");
};

module.exports = { createToken, validToken,isDev };
