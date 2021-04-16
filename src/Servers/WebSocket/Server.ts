import WebSocket from "ws"
import http from "http"
import {Client, Room, RoomPool} from "./Room"
export class SocketServer {
    // private heartbeat: ReturnType<typeof setInterval>
    private wss: WebSocket.Server
    public rooms: RoomPool

    constructor(port: number) {
        console.log(`WS Server on ws://localhost:${port}`)
        this.wss = new WebSocket.Server({port});
        
    
        this.rooms = RoomPool.getInstance();
        this.wss.on('connection', connection)
    }
}


const connection =  function(this: WebSocket.Server, socket: WebSocket, req: http.IncomingMessage) {
    // console.log(this)
    SocketServerInstance.rooms.add(Client.from_url(req.url, socket))
    socket.on('message', function incoming(data) {
        console.log("Mensagem recebida: ", data)
        socket.send("Mensagem recebida meu parceiro")
        //this.wss.send("Sua mensagem foi recebida")
    })
}

const onMessage = () => {

}

const SocketServerInstance = new SocketServer(8080)
export default SocketServerInstance