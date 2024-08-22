const express = require ('express');
const path = require('path');
const http = require ('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
                  
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
console.log(publicDirectoryPath)

app.use(express.static(publicDirectoryPath));

io.on('connection',(socket)=>{
    console.log("New websocket connection established");

    socket.emit('message', "welcome");

    socket.broadcast.emit('message', "A new user Joined");

    socket.on('sendMessage',(message, callback)=>{
        const filter = new Filter();
        if(filter.isProfane(message)){
            return callback("Profanity is not allowed")
        }
        io.emit('message', message);
        callback();
    })

    socket.on('sendLocation',(coords, callback)=>{
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback();
    })

    socket.on('disconnect',()=>{
        io.emit('message', "A user left!")
    })
})

server.listen(3000, ()=>{
    console.log(`App is listening on url http//localhost:${port}`)
})