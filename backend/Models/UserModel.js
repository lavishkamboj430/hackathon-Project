const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    require: true,
  },

  Email: {
    type: String,
    require: true,
    unique: true,
  },
  Password: {
    type: String,
    require: true,
  },
  PhoneNo: {
    type: Number,
  },
  Role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
