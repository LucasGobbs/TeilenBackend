import express from "express";
import { createServer, Server } from 'http';

import * as WebSocket from "ws"
import SocketServer from "./Servers/WebSocket/Server";
export class App {
    public app: express.Application
    public server: Server
    public io: typeof SocketServer
    private PORT: number = 3001

    constructor() {
        this.routes()
        this.io = SocketServer
    }

    routes() {
        this.app = express()
        this.app
        .get('/room/enter', (req, res)=>{
            console.log('room/enter')
            console.log("req: ", req)
            console.log("res: ", res)
            res.send('alo')
        })
        .get('/room/create', (req, res)=>{
            console.log('room/creater')
            console.log("req: ", req)
            console.log("res: ", res)
            res.send('alo')
        })

        this.server = this.app.listen(this.PORT)
    }
}

