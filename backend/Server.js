require("dotenv").config()
const app = require("./app");
const ConnectDB = require("./ConnectDB/ConnectDB");

const Port = process.env.PORT || 3005

ConnectDB()

app.listen(Port, "0.0.0.0", () => {
    console.log(`Server Running on Port ${Port}`)
})