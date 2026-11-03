const express = require("express")
const Route = express.Router()


// Middleware
const Login_Middleware = require("../Middleware/Login_Middleware")
const Register_Middleware = require("../Middleware/Register_Middleware")


//Controller
const Login = require("../Controllers/Login")
const Register = require("../Controllers/Register")







Route.post("/Login", Login_Middleware, Login)
Route.post("/Register", Register_Middleware, Register)

module.exports  = Route
