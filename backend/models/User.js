var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema(
  {
    name: {
      type: String
    },
    profile_pic: {
      type: String
    },
    phone_no: {
      type: Number,
      unique: true
    },
    created: {
      type: Date
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", User);
