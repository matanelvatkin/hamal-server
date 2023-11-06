const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  role: { type: String, enum: ["admin", "user","developer"], default: "user" },
  city: { type: String },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "organization" },
  position: { type: mongoose.Schema.Types.ObjectId, ref: "position" },
  isActive: { type: Boolean, default: true },
  isDelete: { type: Boolean, default: false },
  passwords: { type: String, default: Date.now(),select:false},
  email: { type: String}
});

const users = mongoose.model("user", userSchema);

module.exports = users;
