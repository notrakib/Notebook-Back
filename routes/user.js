const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");

route.post("/sign-in", userController.userSignin);

module.exports = route;