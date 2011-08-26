var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(666);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (client) {
  client.on('move', function(message) {
    message.id = client.id;
    io.sockets.emit('move', message);
  });

  client.on('disconnect', function(){
    io.sockets.emit('close', client.id);
  });
});