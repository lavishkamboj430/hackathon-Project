const Joi = require("joi")

const Validate_Email = () => {
    return Joi.string().email().required()
}

const Validate_Password = () => {
    return Joi.string().min(6).max(20).required()
}

const Validate_UserName = () => {
    return Joi.string().min(4).max(25).required()
}

const Validate_PhoneNo = () => {
    return Joi.number().min(10).max(10).required()
}

module.exports = { Validate_Email, Validate_Password, Validate_UserName,Validate_PhoneNo }