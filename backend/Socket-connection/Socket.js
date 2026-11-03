let io;
const OnlineUsers = {};
const { Server } = require("socket.io");

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });


    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);


        socket.on("disconnect", () => {

            const UserID = socket.userId;

            console.log("User Disconnected:", socket.id);

        });


    });

};



const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO not initialized");
    }

    return io;

};


module.exports = { initializeSocket, getIO };