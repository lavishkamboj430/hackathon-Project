const express = require("express")
const Route = express.Router()


// Middleware
const Login_Middleware = require("../Middleware/Login_Middleware")
const Register_Middleware = require("../Middleware/Register_Middleware")
const ReSend_Register_Middleware = require("../Middleware/Resend_Register_Middleware")


//Controller
const Login = require("../Controllers/Login")
const Register = require("../Controllers/Register")
const Resend_Register = require("../Controllers/Resend_Register")
const Verify_Register = require("../Controllers/Verify_Register")
const Verify_Register_Middleware = require("../Middleware/Verify_Register_Middleware")


Route.post("/Login", Login_Middleware, Login)

Route.post("/Register", Register_Middleware, Register)

Route.post("/Resend-Register", ReSend_Register_Middleware, Resend_Register)

Route.post("/Resend-Register-Otp", Verify_Register_Middleware, Verify_Register)



module.exports  = Route
