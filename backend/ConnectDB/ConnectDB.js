require("dotenv").config()
const mongoose = require("mongoose")

const ConnectDB = async()=>
{   
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected TO DataBase")
    } catch (error) {
        console.log("Unable to Connect with DataBase")
    }
}
module.exports = ConnectDB