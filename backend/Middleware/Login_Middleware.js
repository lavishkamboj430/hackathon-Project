const Joi = require("joi")
const Bcrypt = require("bcrypt")
const UserModel = require("../Models/UserModel")
const { Validate_Email, Validate_Password } = require("../Validation/validation")


const Login_Middleware = async (req, res, next) => {
    
    const { Email, Password } = req.body

    const Schema = Joi.object({
        Email: Validate_Email(),
        Password: Validate_Password()
    })

    const { error } = Schema.validate(req.body)

    if (error) {
        return res.status(301).json(
            {
                Success: false,
                Message: "Invalid Email and Password"
            }
        )
    }

    const isExist = await UserModel.findOne({Email})

    if (!isExist) {
        return res.status(301).json(
            {
                Success: false,
                Message: "Invalid Email and Password"
            }
        )
    }

    const IsValid = await Bcrypt.compare(Password, isExist.Password)

    if (!IsValid) {
        return res.status(301).json(
            {
                Success: false,
                Message: "Invalid Email and Password"
            }
        )
    }
    
    req.User = isExist

    next()

}
module.exports = Login_Middleware