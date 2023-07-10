const socketIo = require("socket.io");

let io;

const makeIo = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("client connecté :", socket.id);

        socket.on("ok", (msg) => {
            console.log(msg);
            console.log("==================");
        });

        socket.emit("Test", "Fo");

        socket.on("disconnect", () => {
            console.log("client déconnecté, ID :", socket.id);
        });
    });

    // io.emit("Test", "Bq");

    return io;
};

const getIo = () => {
    return io;
};
module.exports = { makeIo, getIo };

// const { createServer } = require("http");
// const app = require("./App");

// const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//         credentials: true,
//     },
// });

// server.listen(3500, () => {
//     console.log("Server is running");
// });

// module.exports = io;

// const { Server } = require("socket.io");

// module.exports = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`user connected`);
//   });

//   return io;
// };
