require("dotenv").config()
const app = require("./app");
const http = require("http");
const ConnectDB = require("./ConnectDB/ConnectDB");
const { initializeSocket } = require("./Socket-connection/Socket");

const Port = process.env.PORT || 3005

const server = http.createServer(app);

initializeSocket(server)

ConnectDB()

server.listen(Port, "0.0.0.0", () => {
    console.log(`Server Running on Port ${Port}`)
})