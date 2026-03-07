# Changelog

All notable changes to The Listening Post so far.

---

## [Unreleased]

### Planned

- Welcome text (left column)
- Joke/rules content (right column)
- More “artsy” site content
- Backend for user input
- Local hosting setup
- Sockets for external / real-time user input

---

## WebSocket messaging

### Added

- **WebSocket server** (`server.js`) — Node.js server using the `ws` package. Listens on port 8080 and broadcasts every incoming message to all connected clients.
- **WebSocket client** (`app.js`) — Connects to `ws://<host>:8080` on page load (host from `window.location.hostname`, so it works from other devices). Sends `{ text, name }` as JSON when the user submits; receives broadcast messages and appends them to the message list.
- **Offline fallback** — If the server is not running, submitted messages still appear locally (no sync to other clients).
- **package.json** — Adds `ws` dependency and `npm start` script to run the server.
- **Robust message handling** — Client handles WebSocket messages delivered as Blob or string; defensive JSON parse and validation so invalid payloads don’t break the UI.

### How it works

1. Run `npm install` and `npm start` to start the WebSocket server.
2. Serve the front end over HTTP (e.g. `npx serve` or `python -m http.server`).
3. Open the site in one or more browser tabs/windows. Messages sent from any client are broadcast to all and displayed in real time.

---

## Initial chat UI

### Layout

- Three-column layout: left, center, right. Center column is wider (`flex: 2`), side columns equal (`flex: 1`). Left and right reserved for future content.
- Center column split into:
  - **Chat display** — Scrollable area that grows from the top; messages anchored at the bottom.
  - **Chat input** — Fixed at the bottom: name field, textarea, submit button.

### Messages

- Fixed-size message queue: only the last N messages are kept (N set by `MAX_MESSAGES` in `app.js`). Oldest messages are dropped when the limit is reached.
- Messages shown in placeholder-style boxes; box height follows line count (multi-line supported via `white-space: pre-wrap`).
- New messages appear at the bottom; list auto-scrolls to the newest on submit.

### Input

- Single-line **name** field (optional), placeholder “Your name (optional)”. Value is not cleared on submit so it stays filled in.
- **Message** input is a multi-line textarea (~5 lines visible), with placeholder “Type your message…”. Resizable vertically.
- Submit button sends the message; message content is cleared after send, name is kept.

### Identity and alignment

- Messages stored as `{ text, name }`. Display format: `Name: message` when name is set, otherwise just the message.
- “Own” messages (where message name matches the current name field) are right-aligned (`.message--own` + `align-self: flex-end`). Other messages remain left-aligned. Message bubbles use `max-width: 85%` so alignment is visible.

### Technical

- No backend: messages live in a JavaScript array; UI is structured so a future backend can feed the same list and reuse the same render path.
- Styles in `indexStyle.css`, behavior in `app.js`. Document structure and stylesheet link in `index.html` (proper `<!DOCTYPE>`, `<head>`, `<body>`).
