const express = require("express");
const positionRouter = express.Router();
const positionService = require("../BL/position.services");
const { validToken, isDev } = require("../jwt");


positionRouter.put("/deleteposition",validToken, async (req, res) => {
  try {
    await positionService.deletePosition(req.body);
    res.send('ok');
  } catch (err) {
    res.status(999).send(err);
  }
});
positionRouter.post("/addpositiondev",validToken, async (req, res) => {
  try {
    req.userData.organization = req.body.org
    const results = await positionService.createPosition(req.body,req.userData);
    res.send(results);
  } catch (err) {
    res.status(999).send(err);
  }
});
positionRouter.post("/addposition",validToken, async (req, res) => {
  try {
    const results = await positionService.createPosition(req.body,req.userData);
    res.send(results);
  } catch (err) {
    res.status(999).send(err);
  }
});

positionRouter.get("/allpositionsdev/:org", validToken,isDev, async (req, res) => {
    try {
      req.userData.organization = req.params.org
        const results = await positionService.getAllPosition(req.userData);
        res.send(results);
    } catch (err) {
        console.log(err);
        res.status(999).send(err);
    }
});
positionRouter.get("/allpositions", validToken, async (req, res) => {
    try {
        const results = await positionService.getAllPosition(req.userData);
        res.send(results);
    } catch (err) {
        console.log(err);
        res.status(999).send(err);
    }
});


module.exports = positionRouter;
