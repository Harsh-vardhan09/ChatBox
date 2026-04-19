import express from "express"
const app=express()
const PORT=process.env.PORT|| 8080
import path from "path"
import { fileURLToPath } from "url";
import {Server} from "socket.io"
const server=app.listen(PORT,()=>console.log(`app running on http://localhost:${PORT}`))

const io=new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"public")))
let socketsConnected=new Set()

const onConnected=(socket)=>{
    console.log(socket.id)
    socketsConnected.add(socket.id)
    io.emit('clients-total',socketsConnected.size)

    socket.on('disconnect',()=>{
        console.log("socket disconnected"+socket.id)
        socketsConnected.delete(socket.id)
        io.emit('clients-total',socketsConnected.size)

    })
    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit("chat",data)
    })
    socket.on('feedback',(data)=>{
        socket.broadcast.emit("feedback",data)
    })
}

io.on('connection',onConnected)

