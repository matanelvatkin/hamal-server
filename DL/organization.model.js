const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: { type: String },
  isActive: { type: Boolean, default: true },
  logo: { type: String, default:'/logo.png'}
});

const organizations = mongoose.model("organization", organizationSchema);

module.exports = organizations;
