const positionsData = require("./position.model");

async function create(data) {
  return await positionsData.create(data);
}

async function read(filter) {
  if (filter) {
    return await positionsData.find(filter)
  }
  return await positionsData.find({});
}

async function readOne(filter,proj) {
  const res = await positionsData.findOne(filter,proj)
  return res;
}

async function update(filter, newData) {
  return await positionsData.updateOne(filter, newData)
}

async function updateAndReturn(filter, newData) {
  let data = await positionsData
    .findOneAndUpdate(filter, newData, { new: true })
  if (!data) throw 'positions not found';
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