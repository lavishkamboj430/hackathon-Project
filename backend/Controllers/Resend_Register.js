const Bcrypt = require("bcrypt")
const { Generate_Register_Token } = require("../Token/Token_Functions")
const { generateOtp, getOtpHtml } = require("../utils/Otphtml")
const OtpModel = require("../Models/OtpModel")
const sendEmail = require("../utils/SendEmail")

const Resend_Register = async (req, res) => {

    const { UserName, Email, Password , PhoneNo } = req.User

    const OTP = generateOtp()

    const OtpHtml = getOtpHtml(OTP)

    const HashOtp = await Bcrypt.hash(OTP, 10)

    await OtpModel.deleteMany({ Email });

    try {
        await sendEmail(Email, "OTP Verification", `Your OTP code is ${OTP}`, OtpHtml)
        await OtpModel.create({
            Email: Email,
            Otp: HashOtp,
            Expires: new Date(Date.now() + 60 * 1000)
        })
    } catch (error) {
        console.error("Email/OTP error:", error);
        return res.status(400).json({

            Success: false,
            Message: "Unable to send OTP"

        });

    }

    const Register_Token = Generate_Register_Token(UserName, Email, Password,PhoneNo)

    res.cookie("Register-Token", Register_Token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
    })

    res.status(201).json({ Success: true, Message: "OTP Sent Successfully!" });
}
module.exports = Resend_Register