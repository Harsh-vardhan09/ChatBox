import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let userCount = 0;
interface User{
    socket:WebSocket;
    room:string;
}

// let allSockets:WebSocket[] = [] //we need to give it type because of noImplicitAny
let allSockets:User[]=[];

wss.on('connection', (socket) => {

    socket.on('message', (message) => {
        //@ts-ignore
       const parseMes=JSON.parse(message);
       console.log(parseMes);
       
       
       if(parseMes.type==="join"){

            allSockets.push({
                socket,
                room:parseMes.payload.roomId
            })
       }

       if(parseMes.type==="chat"){
        //    const currRoom=allSockets.find((x)=>x.socket==socket)
        let currRoom=null;
        for(let i=0;i<allSockets.length;i++){
            if(allSockets[i]?.socket==socket){
                //@ts-ignore
                currRoom=allSockets[i].room
            }
        }
        for(let i=0;i<allSockets.length;i++){
            if(allSockets[i]?.room==currRoom){
                allSockets[i]?.socket.send(parseMes.payload.message)
            }
        }
       }

    })
    
})
