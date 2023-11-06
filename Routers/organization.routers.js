const express = require("express");
const organizationRouter = express.Router();
const organizationService = require("../BL/organization.services");
const { validToken } = require("../jwt");


organizationRouter.put("/deleteorganization",validToken, async (req, res) => {
  try {
    await organizationService.deleteOrganization(req.body);
    res.send('ok');
  } catch (err) {
    res.status(999).send(err);
  }
});
organizationRouter.post("/addorganization", async (req, res) => {
  try {
    const results = await organizationService.createOrganization(req.body);
    res.send(results);
  } catch (err) {
    res.status(999).send(err);
  }
});

organizationRouter.get("/", validToken, async (req, res) => {
    try {
        const organization = await organizationService.getOrganization(req.userData.organization);
        res.send(organization);
    } catch (err) {
        console.log(err);
        res.status(999).send(err);
    }
});
// organizationRouter.get("/allorganizations", validToken, async (req, res) => {
//     try {
//         const results = await organizationService.getAllorganization(req.userData);
//         res.send(results);
//     } catch (err) {
//         console.log(err);
//         res.status(999).send(err);
//     }
// });
// organizationRouter.put("/update", validToken, async (req, res) => {
    //   try {
        //     const user = await organizationService.getUser(req.body.fullName);
        //     const updateUser = await organizationService.updateUser(user);
        //     res.send('updateUser');
//   } catch (err) {
//     res.status(999).send(err);
//   }
// });

module.exports = organizationRouter;
