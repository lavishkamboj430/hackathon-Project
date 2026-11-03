require("dotenv").config()
const Jwt = require("jsonwebtoken")
let decode = ""
const Generate_Refresh_Token = (User) => {
    return Jwt.sign(
        {
            UserId: User._id,
            UserName: User.UserName,
            Email: User.Email,
            Role:User.Role
        }, process.env.REFRESH_TOKEN,
        { "expiresIn": "7d" }
    )
}

const Generate_Access_Token = (User) => {
    return Jwt.sign(
        {
            UserId: User._id,
            UserName: User.UserName,
            Email: User.Email,
            Role:User.Role
        }, process.env.ACCESS_TOKEN,
        { "expiresIn": "15m" }
    )
}

const Generate_Register_Token = (UserName, Email, Password,PhoneNo) => {
    return Jwt.sign(
        {
            UserName: UserName,
            Email: Email,
            Password: Password,
            PhoneNo:PhoneNo
        }, process.env.REGISTER_TOKEN,
        { "expiresIn": "15m" }
    )
}

const Generate_ForgotPassword_Token = (User) => {
    return Jwt.sign(
        {
            Email: User.Email,
        }, process.env.CHANGE_PASSWORD_TOKEN,
        { "expiresIn": "15m" }
    )
}

const Decode_Refresh_Token = (Token) => {
    try {
        decode = Jwt.decode(Token, process.env.REFRESH_TOKEN)
        return {
            Success: true,
            Data: decode
        }
    } catch (error) {
        console.log("Error inside Decode Refresh Token")
        return {
            Success: false,
        }
    }
}

const Decode_Access_Token = (Token) => {
    try {
        decode = Jwt.decode(Token, process.env.ACCESS_TOKEN)
        return {
            Success: true,
            Data: decode
        }
    } catch (error) {
        console.log("Error inside Decode Access Token")
        return {
            Success: false,
        }
    }
}
const Decode_Register_Token = (Token) => {
    try {
        decode = Jwt.decode(Token, process.env.REGISTER_TOKEN)
        return {
            Success: true,
            Data: decode
        }
    } catch (error) {
        console.log("Error inside Decode Access Token")
        return {
            Success: false,
        }
    }
}

const Decode_ForgotPassword_Token = (Token) => {
    try {
        decode = Jwt.decode(Token, process.env.CHANGE_PASSWORD_TOKEN)
        return {
            Success: true,
            Data: decode
        }
    } catch (error) {
        console.log("Error inside Decode ForgotPassword Token")
        return {
            Success: false,
        }
    }
}

module.exports = {
    Decode_Access_Token,
    Decode_Refresh_Token,
    Decode_Register_Token,
    Decode_ForgotPassword_Token,
    Generate_Access_Token,
    Generate_Refresh_Token,
    Generate_Register_Token,
    Generate_ForgotPassword_Token,
}