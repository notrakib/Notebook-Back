const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");

route.post("/sign-in", userController.userAutoSignin);
route.post("/manual-sign-up", userController.userManualSignup);
route.post("/manual-sign-in", userController.userManualSignin);

route.post("/edit-profile", userController.userEditProfile);

module.exports = route;
