const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      path = require('path'),
      process = require('process'),
      ws = require('ws');

const config = fs.readFileSync('config/footer.json');
const confjson = JSON.parse(config);
getConfig = function() {
  if (process.argv.length == 3) {
    return confjson[process.argv[2]]
  } else {
    return {'hostname':'', 'port':0};
  }
};
const hostname = getConfig()['hostname'];
const port = getConfig()['port'];

const httpserver = http.createServer((req, res) => {
  const _url = new url.URL(req.url, 'http://' + hostname);
  let pathname = _url.pathname;
  if (pathname == '/') {
    pathname += 'login.html';
  }

  switch (path.extname(pathname)) {
    case '.html':
      pathname = '../view' + pathname;
      break;
    case '.js':
      pathname = '..' + pathname;
      break;
    default:
      res.writeHead('404');
      res.end('<h1>error html</h1>');
      return;
  }

  fs.readFile(pathname, function (err, data) {
    if (err) {
      res.writeHead('404');
      res.end('<h1>404</h1>');
      throw err;
    }
    res.writeHeader(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const websocket = new ws.WebSocketServer({server: httpserver});

websocket.on('connection', function connection(socket) {
  socket.on('message', function message(data) {
    const datajson = JSON.parse(data);
    socket.send(datajson['username']);
  });
});

httpserver.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});