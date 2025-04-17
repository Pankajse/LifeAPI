require('dotenv').config();
// const http = require("http");
const app = require("./app");

// const { initializeSocket } = require("./socket"); // Import the socket initialization function

// const server = http.createServer(app);

// initializeSocket(server);

// server.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });

const express = require('express');
const initializeSocket = require('./socket');


const server = app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

// Initialize Socket.io
initializeSocket(server);