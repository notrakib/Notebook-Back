const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSettingsSchema = new Schema({
  backgroundIMG: String,
  backgroundColor: String,
  fontColor: String,
});

module.exports = mongoose.model("toDoSettings", toDoSettingsSchema);
