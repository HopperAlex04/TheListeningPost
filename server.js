/**
 * Minimal HTTP + WebSocket server for The Listening Post.
 * Serves static files and broadcasts WebSocket messages to all connected clients.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
};

const ALLOWED_FILES = new Set(['index.html', 'app.js', 'indexStyle.css']);

const server = http.createServer(function (req, res) {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Method Not Allowed');
        return;
    }

    var pathname = (req.url || '').split('?')[0];
    if (pathname === '/health' || pathname === '/health/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('ok');
        return;
    }

    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    var basename = path.basename(pathname);
    if (!ALLOWED_FILES.has(basename)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
    }

    var filePath = path.join(ROOT, basename);
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not Found');
            return;
        }
        var ext = path.extname(basename);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

server.listen(PORT, function () {
    console.log('HTTP + WebSocket listening on port ' + PORT);
});
