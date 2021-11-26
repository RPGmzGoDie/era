const http = require('http'),
  fs = require('fs'),
  path = require('path');


const hostname = "0.0.0.0";
const port = 3389;

const server = http.createServer((req, res) => {
  let pathname = "";
  if (path.extname(req.url) == "") {
    pathname += "/login.html";
  } else {
    pathname += req.url;
  }

  switch (path.extname(pathname)) {
    case ".html":
      pathname = "../view" + pathname;
      break;
    case ".js":
      pathname = ".." + pathname;
      break;
    default:
      res.writeHead('404');
      res.end('<h1>404</h1>');
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
