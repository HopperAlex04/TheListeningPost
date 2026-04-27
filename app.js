var MAX_MESSAGES = 10;
var messages = [];

var nameInput = document.getElementById('name');
var msgInput = document.getElementById('msg');
var output = document.getElementById('output');
var submitBtn = document.getElementById('submit');

// WebSocket: connect to server (must be served over http, not file://)
var ws = null;
var wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
var wsUrl = wsProtocol + '//' + window.location.host;

function connectWebSocket() {
    try {
        ws = new WebSocket(wsUrl);
        ws.onmessage = async function (event) {
            var data;
            if (event.data instanceof Blob) {
                data = await event.data.text();
            } else {
                data = typeof event.data === 'string' ? event.data : String(event.data);
            }
            var msg;
            try {
                msg = JSON.parse(data);
            } catch (e) {
                console.warn('Invalid message format:', data);
                return;
            }
            if (!msg || typeof msg.text !== 'string') return;
            if (messages.length >= MAX_MESSAGES) messages.shift();
            messages.push({ text: msg.text, name: (msg.name && typeof msg.name === 'string') ? msg.name : '' });
            renderMessages();
            output.parentElement.scrollTop = output.parentElement.scrollHeight;
        };
        ws.onclose = function () {
            ws = null;
        };
    } catch (e) {
        console.warn('WebSocket connect failed:', e);
    }
}

connectWebSocket();

function renderMessages() {
    var currentName = nameInput.value.trim();
    output.innerHTML = '';
    messages.forEach(function (msg) {
        var el = document.createElement('div');
        el.className = 'message';
        if (currentName && msg.name === currentName) {
            el.classList.add('message--own');
        }
        el.textContent = msg.name ? msg.name + ': ' + msg.text : msg.text;
        output.appendChild(el);
    });
}

function addAndRender(msg) {
    if (messages.length >= MAX_MESSAGES) messages.shift();
    messages.push(msg);
    renderMessages();
    msgInput.value = '';
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

submitBtn.addEventListener('click', function () {
    var text = msgInput.value.trim();
    if (!text) return;
    var name = nameInput.value.trim();
    var msg = { text: text, name: name };

    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
        msgInput.value = '';
        // Message will appear when server broadcasts it back
    } else {
        addAndRender(msg);
    }
});

