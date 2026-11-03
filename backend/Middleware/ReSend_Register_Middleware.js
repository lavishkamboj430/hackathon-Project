const Joi = require("joi")
const UserModel = require("../Models/UserModel")
const { Decode_Register_Token } = require("../Token/Token_Functions")

const ReSend_Register_Middleware = async (req, res, next) => {

    const Register_Token = req.cookies["Register-Token"]

    if(!Register_Token)
    {
        return res.status(400).json(
            {
                Success:false,
                Message:"Session Expire"
            }
        )
    }

    const IsValid = Decode_Register_Token(Register_Token)

    if(!IsValid.Success)
    {
        return res.status(400).json(
            {
                Success:false,
                Message:"Session Expire !"
            }
        )
    }

    const isExist = await UserModel.find({
        $or: [
            { UserName: IsValid.Data.UserName },
            { Email: IsValid.Data.Email }
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

    req.User = IsValid.Data

    next()

}
module.exports = ReSend_Register_Middleware