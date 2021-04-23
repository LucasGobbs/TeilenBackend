import {nanoid} from 'nanoid'
import WebSocket from "ws"

export class Client {
    public readonly id: number
    public socket: WebSocket
    constructor(id: number, socket: WebSocket){
        this.id = id
        // teste
        this.socket = socket
        // this.socket.send('Client Created')
    }
    public message(data: string): void {
        this.socket.send(data);
    }
    static from_url(url: string, socket: WebSocket): Client{
        return new Client(Client.parse_url(url), socket)
    }
    static parse_url(url: string){
        return parseInt(url.substr(1), 10)
    }
}
export class Room {
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

export class RoomPool {
    private static instance: RoomPool
    private rooms: {[id: string]: Room} = {}
    private waiting_id: string
    constructor(){
        this.rooms = {}
        this.waiting_id = "00000"
        this.rooms[this.waiting_id] = new Room('waiting_room',{
            file_structure: [
                {
                    type: 'folder', name: 'src', items: [
                        {type: 'file', name: 'Glider.js'}
                    ]
                }
            ]
        })
    }
    public add(client: Client, id: string = this.waiting_id): void {
        this.rooms[this.waiting_id].add(client)
    }
    public remove(client_id: number, id: string = this.waiting_id): void {
        this.rooms[this.waiting_id].remove(client_id)
    }



    public static getInstance(): RoomPool {
        if (!RoomPool.instance) {
            RoomPool.instance = new RoomPool();
        }

        return RoomPool.instance;
    }
}