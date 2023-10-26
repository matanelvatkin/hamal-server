const positionController = require("../DL/position.controller");


const getPosition = async (_id,proj) => {
  const position = await positionController.readOne({ _id},proj);
  if (!position) throw 'position nut found';
  return position;
};
const getAllPosition = async () => {
  const positions = await positionController.read({isActive:true});
  if (!positions) throw 'positions nut founds';
  return positions.sort((a,b)=>a.name.localeCompare(b.name))
};
const getPositionForRegister = async (name) => {
  const position = await positionController.readOne({ name,isActive:true });
  if (position) throw 'position already exist';
  return position;
};

const createPosition = async (data) => {
  await getPositionForRegister(data.name);
  return await positionController.create(data);
};
const deletePosition = async (position) => {
  return await positionController.updateAndReturn({_id:position._id},{isActive:!position.isActive});
};

module.exports = {getPosition,createPosition,getAllPosition,deletePosition}