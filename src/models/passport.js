const mongoose = require("mongoose");
const passsport = mongoose.Schema(
  {
    name: { type: String, required: true },
    fathername: { type: String, required: true },
    gender: { type: String, required: true },
    avatar: { type: String },
    contact: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Passports", passsport);
