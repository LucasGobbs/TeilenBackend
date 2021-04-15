import * as WebSocket from "ws"
import http from "http"

class Client {
    public readonly id: number
    public socket: WebSocket
    constructor(id: number, socket: WebSocket){
        this.id = id
        this.socket = socket
        this.socket.send('Client Created')
    }
    public message(data: string): void {
        this.socket.send(data);
    }
    static from_url(url: string, socket: WebSocket){
        return new Client(Client.parse_url(url), socket)
    }
    static parse_url(url: string){
        return parseInt(url.substr(1), 10)
    }
}
class Room {
    private id: number
    private clients:  {[key: number]: Client } = {}
    private name: string
    private data: any
    constructor(name: string, data?: any){
        this.name = name
        
        this.data = data;
        
    }
    add(client: Client){
        this.clients[client.id] = client
        if(this.data){
            console.log("mandando")
            client.message(JSON.stringify(this.data))
        }
    }
    remove(id: number){
        delete this.clients[id]
    }
}
export class SocketServer {
    // private heartbeat: ReturnType<typeof setInterval>
    private wss: WebSocket.Server
    //private clients: WebSocket. = []

    public waiting_room: Room
    private rooms: Room[] = []

    constructor(port: number) {
        console.log(
        `WS Server on ws://localhost:${port}`)
        this.wss = new WebSocket.Server({port});
        this.waiting_room = new Room("test_room", {
            file_structure: [
                {
                    type: 'folder', name: 'src', items: [
                        {type: 'file', name: 'Glider.js'}
                    ]
                }
            ]
        }
        )
     
        this.wss.on('connection', connection)
    }
}


const connection =  function(this: WebSocket.Server, socket: WebSocket, req: http.IncomingMessage) {
    // console.log(this)
    SocketServerInstance.waiting_room.add(Client.from_url(req.url, socket))
    socket.on('message', function incoming(data) {
        console.log("Mensagem recebida: ", data)
        socket.send("Mensagem recebida meu parceiro")
        //this.wss.send("Sua mensagem foi recebida")
    })
    console.log(SocketServerInstance.waiting_room)
}

const onMessage = () => {

}

const SocketServerInstance = new SocketServer(8080)
export default SocketServerInstance