const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const cors = require('cors')

const {addUser, getUser, removeUser} = require('./users')

const port = process.env.PORT || 5500
const app = express()
const server = http.createServer(app)
const io = socketio(server,  {
    cors: true, // enable cross orgin resource sharing
    origin: '*' // allow all origins
})


app.use(router)
app.use(cors())

server.listen(port, () =>{
    console.log("Server Listening.. on ", port)
})

// Socket initiation
io.on('connection', socket =>{
    // JOIN TO CONVERSATION
    socket.on('join', ({name, room}, callback) =>{
       const {error, user} = addUser({id: socket.id, name: name, room: room})
       
       if(error) return callback(error)

       socket.join(user.room)     
        
       socket.emit('message',{user:'Admin', text: `${user.name} Welcome to the ${user.room}`})
       socket.broadcast.to(user.room).emit('message', { user:'Admin', text:`${user.name} has joined`})

       callback();
    })

    // HANDLE THE MESSAGES 
    socket.on('send-message', (data) =>{
        let user = getUser(socket.id)
        // console.log({user: user.name, text: data})
        io.to(user.room).emit('message', {user: user.name, text: data})

    })

    socket.on('disconnect', ()=>{
        let usr = removeUser(socket.id)
        if(usr){
            socket.broadcast.to(usr.room).emit('message', { user:'Admin', text:`${usr.name} has disconnected`})
        }
    })
    
})
