# The Listening Post

A minimal, front-end chat-style UI. Messages are shown in a central column with an optional name; the layout is built so a backend and real-time messaging can be added later.

## Run it

Open `index.html` in a browser (e.g. double-click or `file://`). No build step or server required for the current UI.

For local hosting later, use any static file server (e.g. `python -m http.server`, `npx serve`).

## Current features

- **Three-column layout** — Left and right columns are reserved for future content (e.g. welcome text, rules). Center column is wider and holds the chat.
- **Message list** — Keeps the last N messages (configurable in `app.js` as `MAX_MESSAGES`). New messages appear at the bottom and push older ones up; the view auto-scrolls to the latest.
- **Multi-line input** — Textarea for paragraph-style messages (about 5 lines visible by default).
- **Optional name** — A name field above the message box; if set, messages are shown as `Name: message`. The field persists so you don’t re-type it.
- **Own vs others** — Messages whose name matches the current name field are right-aligned; others stay left-aligned.

## Tech

- Plain HTML, CSS, and JavaScript.
- No frameworks. Messages live in an in-memory array; the UI is structured so a backend can later feed the same list (e.g. via WebSockets) and the same render path can be used.

## Project structure

```
index.html      — Page structure and chat markup
indexStyle.css  — Layout and styles
app.js          — Message queue, render logic, submit handler
todoIdeas.txt   — Planned features (welcome text, rules, backend, hosting, sockets)
```

## Roadmap

See `todoIdeas.txt` for planned items (welcome text, rules, backend, local hosting, sockets). The front end is designed so the backend can be “hooked up” without reworking the UI.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes.
