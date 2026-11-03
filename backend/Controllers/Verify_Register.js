const Bcrypt = require("bcrypt")
const OtpModel = require("../Models/OtpModel")
const UserModel = require("../Models/UserModel")
const Verify_Register = async (req, res) => {

    const Decode = req.User

    console.log("inside verify", Decode)

    const { Otp } = req.body


    const isExist = await OtpModel.findOne({
        $and: [
            { Email: Decode.Email },
            { Expires: { $gt: new Date() } }
        ]
    })

    if (!isExist) {
        return res.status(400).json(
            {
                Success: false,
                Message: "Try again"
            }
        )
    }


    const isValid = await Bcrypt.compare(Otp, isExist.Otp)

    if (!isValid) {
        return res.status(400).json(
            {
                Success: false,
                Message: "Enter Valid OTP !"
            }
        )
    }

    await UserModel.create(
        {
            UserName: Decode.UserName,
            Email: Decode.Email,
            Password: Decode.Password
        }
    )

    return res.status(200).json(
        {
            Success: true,
            Message: "Account Created Successfully !"
        }
    )



}
module.exports = Verify_Register
