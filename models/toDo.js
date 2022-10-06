const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    toDoTitle: String,
    status: String,
    createdAt: String,
    endedAt: String,
  },
  { toJSON: { virtuals: true } }
);

toDoSchema.virtual("toDoList", {
  ref: "ToDoList",
  localField: "_id",
  foreignField: "toDo",
});

module.exports = mongoose.model("ToDo", toDoSchema);
