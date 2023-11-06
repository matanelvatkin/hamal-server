const organizationController = require("../DL/organization.controller");


const getOrganization = async (_id,proj) => {
  const organization = await organizationController.readOne({ _id,isActive:true},proj);
  if (!organization) throw 'organization nut found';
  return organization;
};
const getAllOrganization = async (proj) => {
  const organization = await organizationController.read({isActive:true},proj);
  if (!organization) throw 'organizations nut found';
  return organization;
};

const createOrganization = async (data) => {
  return await organizationController.create(data);
};
const deleteOrganization = async (organization) => {
  return await organizationController.updateAndReturn({_id:organization._id},{isActive:!organization.isActive});
};

module.exports = {getOrganization,createOrganization,deleteOrganization,getAllOrganization}


