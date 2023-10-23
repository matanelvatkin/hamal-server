const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  role:{type: String,enum: ['admin', 'user'],default: 'user'},
  isActive: { type: Boolean, default: true },
});

const users = mongoose.model("user", userSchema);

module.exports = users;