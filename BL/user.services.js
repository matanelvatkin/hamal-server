const userController = require("../DL/user.controller");


const getUser = async (fullName,proj) => {
  const user = await userController.readOne({ fullName },proj);
  if (!user) throw 'user nut found';
  return user;
};
const getAllUser = async (admin) => {
  const users = await userController.read({organization:admin.organization, isDelete:false});
  if (!users) throw 'users nut founds';
  return users.sort((a,b)=>a.fullName.localeCompare(b.fullName)).sort((a,b)=>Number(a.isActive)-Number(b.isActive))
};
const getUserForRegister = async (fullName) => {
  const user = await userController.readOne({ fullName,isDelete:false });
  if (user) throw 'user already registered';
  return user;
};

const createUser = async (data,admin) => {
  await getUserForRegister(data.fullName);
  data.organization = admin.organization
  return await userController.create(data);
};
const updateUser = async (user) => {
  return await userController.updateAndReturn({_id:user._id},{isActive:!user.isActive});
};
const addPosition = async (user,position) => {
  return await userController.updateAndReturn({_id:user._id},{position:position._id});
};

const crateAdmin = async (user) => {
  return await userController.updateAndReturn({_id:user._id},{role:user.role==='admin'?'user':'admin'});
};
const deleteUser = async (user) => {
  return await userController.updateAndReturn({_id:user._id},{isDelete:!user.true});
};

module.exports = {getUser,createUser,updateUser,getAllUser,deleteUser,crateAdmin,addPosition}