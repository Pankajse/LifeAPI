const socketIo = require('socket.io');
const { UserModel } = require('./models/user.model');
const OrgModel = require('./models/org.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'org') {
                await OrgModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}



module.exports = { initializeSocket };