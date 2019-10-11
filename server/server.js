const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');


app.use(express.json());
app.use(cors);

io.on('connection', socket => {
    
    socket.on("search", username => {
        socket.nickname = username; 
        if(io.sockets.adapter.rooms.wait_room == undefined){
            socket.join("wait_room");
        }else{
            
            if(Object.getOwnPropertyNames(io.sockets.adapter.rooms.wait_room)[0] == undefined){
                socket.join("wait_room");
            }else{
                let theClientId = 
                Object.getOwnPropertyNames(io.sockets.adapter.rooms.wait_room.sockets)[0];
                io.sockets.adapter.del(theClientId, "wait_room");
                let roomName = theClientId + "_" + socket.id;
                
                io.sockets.sockets[theClientId].join(roomName);
                socket.join(roomName);
                
                if(socket.nickname == io.sockets.sockets[theClientId].nickname){
                    socket.nickname = "Çakma(" + socket.nickname + ")";
                }

                io.to(roomName).emit("START_GAME", {gameStart: true,
                    users: [socket.nickname, io.sockets.sockets[theClientId].nickname],
                turn: socket.nickname, roomName: roomName});
            }
        }
    });

    socket.on('action', (data) =>  {
        socket.to(data.roomName).emit('action', data);
    });

    socket.on('send', (data) => {
        socket.to(data.roomName).emit('send', data.msg);
    })

})

server.listen(process.env.PORT || '3000', () => {
    console.log("Server is running on port 3000");
});