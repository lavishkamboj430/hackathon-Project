const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "User is required" ]
    },
    RefreshTokenHash: {
        type: String,
        required: [ true, "Refresh token hash is required" ]
    },
    ip: {
        type: String,
        required: [ true, "IP address is required" ]
    },
    revoked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const sessionModel = mongoose.model("sessions", sessionSchema)


module.exports =  sessionModel