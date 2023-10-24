const userController = require("../DL/user.controller");


const getUser = async (fullName,proj) => {
  const user = await userController.readOne({ fullName },proj);
  if (!user) throw 'user nut found';
  return user;
};
const getAllUser = async () => {
  const users = await userController.read();
  if (!users) throw 'users nut founds';
  return users.sort((a,b)=>a.fullName.localeCompare(b.fullName)).sort((a,b)=>Number(a.isActive)-Number(b.isActive))
};
const getUserForRegister = async (fullName) => {
  const user = await userController.readOne({ fullName });
  if (user) throw 'user already registered';
  return user;
};

const createUser = async (data) => {
  await getUserForRegister(data.fullName);
  return await userController.create(data);
};
const updateUser = async (user) => {
  return await userController.updateAndReturn({fullName:user.fullName},{isActive:!user.isActive});
};

module.exports = {getUser,createUser,updateUser,getAllUser}