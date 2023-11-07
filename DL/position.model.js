const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization" },
  positionNumber: {type: Number},
  isActive: {type: Boolean, default: true},
});

const positions = mongoose.model("position", positionSchema);

module.exports = positions;
