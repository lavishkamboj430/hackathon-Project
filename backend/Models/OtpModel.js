const mongoose = require("mongoose")

const OtpSchema = new mongoose.Schema(
    {
        Email: {
            type: String,
            required: [true, "Email is required"],
        },
        Otp: {
            type: String,
            required: [true, "OTP Must Required"],
        },
        Expires: {
            type: Date,
        }
    }
)
const OtpModel = mongoose.model("Otp", OtpSchema)

module.exports = OtpModel