const http = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path');
      

const hostname = "0.0.0.0";
const port = 3389;

const server = http.createServer((req, res) => {
  let pathname = __dirname + url.parse(new URL(req.url)).pathname;
  if(path.extname(pathname)=='') {
    pathname+='/view/login.html';
  }
  if(path.extname(pathname) != 'html'){
    res.writeHead('404');
    res.end('<h1>404</h1>');
    return;
  }

  fs.readFile(pathname, function(err, data){
    if (err) {
      res.writeHead('404');
      res.end('<h1>404</h1>');
      throw err;
    }
    res.writeHeader(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
