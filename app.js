var MAX_MESSAGES = 10;
var messages = [];

var msgInput = document.getElementById('msg');
var output = document.getElementById('output');
var submitBtn = document.getElementById('submit');

function renderMessages() {
    output.innerHTML = '';
    messages.forEach(function (text) {
        var el = document.createElement('div');
        el.className = 'message';
        el.textContent = text;
        output.appendChild(el);
    });
}

submitBtn.addEventListener('click', function () {
    var text = msgInput.value.trim();
    if (!text) return;
    if (messages.length >= MAX_MESSAGES) {
        messages.shift();
    }
    messages.push(text);
    renderMessages();
    msgInput.value = '';
});

