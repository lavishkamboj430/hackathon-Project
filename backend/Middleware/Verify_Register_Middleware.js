const { Decode_Register_Token } = require("../Token/Token_Functions")

const Verify_Register_Middleware = (req, res, next) => {

    let Decode = ""

    const Register_Token = req.cookies["Register-Token"]

    if (!Register_Token) {
        return res.status(400).json(
            {
                Success: false,
                Message: "Session Expired !"
            }
        )
    }

    Decode = Decode_Register_Token(Register_Token)


    if (!Decode.Success) {
        return res.status(400).json(
            {
                Success: false,
                Message: "Session Expired !"
            }
        )
    }

    req.User = Decode.Data
    next()


}
module.exports = Verify_Register_Middleware