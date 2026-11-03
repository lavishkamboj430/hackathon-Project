const Jwt = require("jsonwebtoken")
const sessionModel = require("../Models/SessionModel")
const Crypto = require("crypto")
const { Generate_Refresh_Token, Generate_Access_Token } = require("../Token/Token_Functions")

const Login = async (req, res) => {

    console.log(req.User)
    
    const Refresh_Token = Generate_Refresh_Token(req.User)

    const Access_Token = Generate_Access_Token(req.User)

    const HashToken = Crypto.createHash("sha256").update(Refresh_Token).digest("hex")

    await sessionModel.create(
        {
            User: req.User._id,
            RefreshTokenHash: HashToken,
            ip:req.ip
        }
    )

    res.cookie("Refresh-Token", Refresh_Token, {
        httpOnly: true,
        secure: true,
    })

    return res.status(200).json(
        {
            Success: true,
            Message: "Login Successfull !",
            Access_Token: Access_Token,
            UserName:req.User.UserName,
            UserId:req.User._id,
            Role:req.User.Role
        }
    )

}
module.exports = Login