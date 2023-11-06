const userData = require("./user.model");
const organization = require("./organization.controller");
require('./position.model')
async function create(data) {
  return await userData.create(data);
}

async function read(filter) {
  if (filter) {
    return await userData.find(filter).populate('position');
  }
  return await userData.find({});
}

async function readOne(filter,proj) {
  const res = await userData.findOne(filter,proj).populate('position')
  return res;
}

async function update(filter, newData) {
  return await userData.updateOne(filter, newData)
}
async function updateAndReturn(filter, newData) {
  let data = await userData
    .findOneAndUpdate(filter, newData, { new: true }).populate('position')
  if (!data) throw 'user not found';
  return data;
}
async function del(id) {
  return await update(id, { status: "deleted" });
}

module.exports = {
  create,
  read,
  readOne,
  update,
  updateAndReturn,
  del,
};