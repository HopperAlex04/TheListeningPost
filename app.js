var MAX_MESSAGES = 10;
var messages = [];

var nameInput = document.getElementById('name');
var msgInput = document.getElementById('msg');
var output = document.getElementById('output');
var submitBtn = document.getElementById('submit');

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

submitBtn.addEventListener('click', function () {
    var text = msgInput.value.trim();
    if (!text) return;
    var name = nameInput.value.trim();
    if (messages.length >= MAX_MESSAGES) {
        messages.shift();
    }
    messages.push({ text: text, name: name });
    renderMessages();
    msgInput.value = '';
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
});

