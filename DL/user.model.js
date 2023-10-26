const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  city: { type: String },
  organization: { type: String },
  position: { type: mongoose.Schema.Types.ObjectId, ref: "position" },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
});

const users = mongoose.model("user", userSchema);

module.exports = users;
