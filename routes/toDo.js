const express = require("express");
const route = express.Router();
const toDoController = require("../controllers/toDO");

route.post("/create-toDO", toDoController.createToDo);
route.get("/fetch-all-toDO", toDoController.fetchAllToDo);
route.delete("/delete-toDO/:taskId", toDoController.deleteToDo);
// route.post("/change_status-toDO/:toDoId", toDoController.changeStatusToDo);

route.post("/create-toDOList/:taskId", toDoController.createToDoList);
route.get("/fetch-all-toDOList/:taskId", toDoController.fetchAllToDoList);
route.post("/edit-toDOList/:taskListId", toDoController.editToDoList);
// route.delete("/delete-toDOList/:toDoListId", toDoController.deleteToDoList);
route.post(
  "/change_status-toDOList/:taskListId",
  toDoController.changeStatusToDoList
);

module.exports = route;
