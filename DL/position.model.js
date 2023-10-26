const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  positionNumber: {type: Number},
  organization: {type: String},
  isActive: {type: Boolean, default: true},
});

const positions = mongoose.model("position", positionSchema);

module.exports = positions;
