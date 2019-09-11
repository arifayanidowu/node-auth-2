const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 225
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 225
    },
    password: {
      type: String,
      required: true,
      max: 1024
    }
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);
