const express = require("express");
const organizationRouter = express.Router();
const organizationService = require("../BL/organization.services");
const { validToken, isDev } = require("../jwt");
const { getUser, getAllUser } = require("../BL/user.services");

organizationRouter.put("/deleteorganization", validToken, async (req, res) => {
  try {
    await organizationService.deleteOrganization(req.body);
    res.send("ok");
  } catch (err) {
    res.status(999).send(err);
  }
});
organizationRouter.post("/addorganization",validToken,isDev, async (req, res) => {
  try {
    const results = await organizationService.createOrganization(req.body);
    res.send(results);
  } catch (err) {
    res.status(999).send(err);
  }
});

organizationRouter.get("/", validToken, async (req, res) => {
  try {
    const organization = await organizationService.getOrganization(
      req.userData.organization
    );
    res.send(organization);
  } catch (err) {
    console.log(err);
    res.status(999).send(err);
  }
});
organizationRouter.get(
  "/allorganizations",
  validToken,isDev,
  async (req, res) => {
    try {
      const results = await organizationService.getAllOrganization();
      res.send(results);
    } catch (err) {
      console.log(err);
      res.status(999).send(err);
    }
  }
);

organizationRouter.get(
  "/developerorg/:org",
  validToken,
  isDev,
  async (req, res) => {
    try {
      const users = await getAllUser({organization:req.params.org});
      res.send(users);
    } catch (err) {
      res.status(999).send(err);
    }
  }
);

module.exports = organizationRouter;
