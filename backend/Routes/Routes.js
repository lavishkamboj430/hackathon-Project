const express = require("express")
const Route = express.Router()

// Middleware

const Login_Middleware = require("../Middleware/Login_Middleware")







Route.post("/Login", Login_Middleware, Login)

module.exports  = Route
