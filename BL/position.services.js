const positionController = require("../DL/position.controller");


const getPosition = async (_id,proj) => {
  const position = await positionController.readOne({ _id},proj);
  if (!position) throw 'position nut found';
  return position;
};
const getAllPosition = async (admin) => {
  const positions = await positionController.read({organization:admin.organization,isActive:true});
  if (!positions) throw 'positions nut founds';
  return positions.sort((a,b)=>a.name.localeCompare(b.name))
};
const getPositionForRegister = async (name,organization) => {
  const position = await positionController.readOne({ name,isActive:true,organization });
  if (position) throw 'position already exist';
  return position;
};

const createPosition = async (data,admin) => {
  data.organization = admin.organization
  await getPositionForRegister(data.name,data.organization);
  return await positionController.create(data);
};
const deletePosition = async (position) => {
  return await positionController.updateAndReturn({_id:position._id},{isActive:!position.isActive});
};

module.exports = {getPosition,createPosition,getAllPosition,deletePosition}


