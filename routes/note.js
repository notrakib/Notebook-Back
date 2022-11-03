const express = require("express");
const route = express.Router();
const notesController = require("../controllers/note");
const isAuth = require("../middleware/auth");

route.post("/post-note", notesController.postNote);
route.get("/get-note", notesController.getNote);

route.post("/post-share-note", notesController.postShare);
route.get("/get-share-note", notesController.getShare);

route.post("/post-comment", notesController.postComment);

module.exports = route;
