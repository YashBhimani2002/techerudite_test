const express = require("express");
const { insertConnectionController, userLoginController } = require("../controller/users/userController");
const Route = express.Router();


Route.post('/insertUser', insertConnectionController);
Route.post('/loginUser',userLoginController);
module.exports = Route;