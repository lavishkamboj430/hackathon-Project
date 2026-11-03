const Joi = require("joi")
const UserModel = require("../Models/UserModel")
const { Validate_Email, Validate_Password, Validate_UserName } = require("../Validation/validation")

const Register_Middleware = async (req, res, next) => {

    const { UserName, Email, Password , PhoneNo } = req.body


    const Schema = Joi.object({
        UserName: Validate_UserName(),
        Email: Validate_Email(),
        Password: Validate_Password(),
        Confirm_Password:Validate_Password()
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
    const isExist = await UserModel.find({
        $or: [
            { UserName: UserName },
            { Email: Email }
        ]
    })

    if (isExist.length) {
        return res.status(400).json(
            {
                Success: false,
                Message: "Try With Different UserName And Email"
            }
        )
    }

    next()

}
module.exports = Register_Middleware