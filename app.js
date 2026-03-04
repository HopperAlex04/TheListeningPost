document.getElementById('submit').addEventListener('click', function() {
    var message = document.getElementById('msg').value;
    document.getElementById('output').innerHTML = message;
});