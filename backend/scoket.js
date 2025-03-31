const socketio = require("socket.io");
const { UserModel } = require("./models/user.model");
const OrgModel = require("./models/org.model");

let io;

function initializeServer(server){
    io = socketio(server,{
        cors : {
            origin : '*',
            methods : ['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client connected ${socket.id}`);

        socket.on('join',async(data)=>{
            const {userType, userId}= data;
            if(userType === "user"){
                await UserModel.findByIdAndUpdate(userId,{socketId : socket.id});
            }else if(userType === "org"){
                await OrgModel.findByIdAndUpdate(userId,{socketId : socket.id});
            }
        });

        socket.on('message',async(data)=>{
            const {userId,recieverId,message} = data;
            const receiver = await UserModel.findById(recieverId);
            if (io) {
                io.to(receiver.socketId).emit('message',{userId,message});
            } else {
                console.log('Socket.io not initialized.');
            }
        })
    });
}