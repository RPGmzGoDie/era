const ws = require('ws');

const wss = new ws.WebSocketServer({ port: 7770 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});