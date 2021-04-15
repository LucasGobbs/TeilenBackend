const ShareDB = require('sharedb')
const WebSocket = require('ws')
const WebSocketJSONStream = require('websocket-json-stream')


function createServer () {
  const ws = new WebSocket.Server({
    port: process.env.PORT || 9515
  })
  ws.on('connection', (ws, req) => {
    console.log("Novo cliente");
    ws.send("fala mano beleza cara???")
  })
  ws.on('message', function incoming(data) {
    console.log(data);
  });
}

createServer()
console.log(`http://localhost:${process.env.PORT || 9515}`)