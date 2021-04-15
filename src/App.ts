import express from "express";
import { createServer, Server } from 'http';

import * as WebSocket from "ws"
import SocketServer from "./SocketServer";
export class App {
    public app: express.Application
    public server: Server
    public io: typeof SocketServer
    public PORT: number = 3000

    constructor() {
        this.routes()
        this.io = SocketServer
    }

    routes() {
        this.app = express()
        this.app.get( "/", ( req, res ) => {
            res.send( "Hello world!" )
        } )
        this.server = this.app.listen(3001)
    }
}

