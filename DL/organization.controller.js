const organizationData = require("./organization.model");

async function create(data) {
  return await organizationData.create(data);
}

async function read(filter) {
  if (filter) {
    return await organizationData.find(filter)
  }
  return await organizationData.find({});
}

async function readOne(filter,proj) {
  const res = await organizationData.findOne(filter,proj)
  return res;
}

async function update(filter, newData) {
  return await organizationData.updateOne(filter, newData)
}

async function updateAndReturn(filter, newData) {
  let data = await organizationData
    .findOneAndUpdate(filter, newData, { new: true })
  if (!data) throw 'organization not found';
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