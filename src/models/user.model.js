const mongoose = require("mongoose");
const { Schema } = mongoose;

let userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
});

let userModel = new mongoose.model("Users", userSchema);

module.exports = userModel;
