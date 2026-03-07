# The Listening Post

A minimal, front-end chat-style UI. Messages are shown in a central column with an optional name. Real-time messaging is provided via WebSockets.

## Run it

1. **Start the WebSocket server** (required for live messaging):
   ```bash
   npm install
   npm start
   ```
   The server runs on port 8080. The client connects using the page’s host (`ws://<host>:8080`), so you can test from other devices on the same network (e.g. phone) by opening `http://<this-PC-IP>:3000` and ensuring the firewall allows ports 3000 and 8080.

2. **Serve the front end** — The page must be served over HTTP (not `file://`) for WebSockets to work:
   ```bash
   npx serve
   ```
   Or: `python -m http.server 3000`, then open `http://localhost:3000`.

3. Open the site in a browser. Messages you send are broadcast to all connected clients in real time.

**Offline mode:** If the WebSocket server is not running, messages still appear locally when you submit (they just won’t sync to other clients).

## Current features

- **Three-column layout** — Left and right columns are reserved for future content (e.g. welcome text, rules). Center column is wider and holds the chat.
- **Message list** — Keeps the last N messages (configurable in `app.js` as `MAX_MESSAGES`). New messages appear at the bottom and push older ones up; the view auto-scrolls to the latest.
- **Multi-line input** — Textarea for paragraph-style messages (about 5 lines visible by default).
- **Optional name** — A name field above the message box; if set, messages are shown as `Name: message`. The field persists so you don’t re-type it.
- **Own vs others** — Messages whose name matches the current name field are right-aligned; others stay left-aligned.

## Tech

- Plain HTML, CSS, and JavaScript on the front end.
- Node.js WebSocket server (`ws` package) for real-time message broadcast.
- Messages are sent as JSON `{ text, name }` over the WebSocket; the server echoes each message to all connected clients.

## Project structure

```
index.html      — Page structure and chat markup
indexStyle.css  — Layout and styles
app.js          — Message queue, render logic, WebSocket client, submit handler
server.js       — WebSocket server (broadcasts messages to all clients)
package.json    — Node dependencies (ws)
```

## How WebSockets work (basic flow)

1. **Connection** — On load, `app.js` opens a WebSocket to `ws://<current host>:8080` (so it works from other devices when you use the PC’s IP in the URL).
2. **Send** — When you click Submit, the client sends `{ text, name }` as JSON over the socket.
3. **Broadcast** — The server receives the message and sends it to every connected client (including the sender).
4. **Receive** — Each client's `onmessage` handler reads the message (handling Blob or string), parses JSON (with validation), appends to the message list, and re-renders.
5. **Offline** — If the server is down, messages are added locally only (no sync to other clients).

## Roadmap

Planned items: welcome text (left column), rules (right column), more artsy content. WebSocket support is now implemented.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes.
