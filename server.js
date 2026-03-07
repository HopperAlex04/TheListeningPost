/**
 * Minimal WebSocket server for The Listening Post.
 * Broadcasts every incoming message to all connected clients.
 */
const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        // Broadcast the raw message to every connected client (including sender)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

console.log('WebSocket server running on ws://localhost:' + PORT);
