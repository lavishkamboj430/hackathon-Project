const express = require("express")
const Route = express.Router()


// Middleware
const Login_Middleware = require("../Middleware/Login_Middleware")


//Controller
const Login = require("../Controllers/Login")







Route.post("/Login", Login_Middleware, Login)
// Route.post("/Login", Login_Middleware, Login)

module.exports  = Route
