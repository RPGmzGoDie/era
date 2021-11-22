const http = require('http'),
      fs = require('fs'),
      url = require('url'),
      path = require('path');
      

const hostname = "0.0.0.0";
const port = 3389;

const server = http.createServer((req, res) => {
  let pathname = __dirname+url.parse(req.url).pathname;
  if(path.extname(pathname)=='') {
    pathname+='/';
  }
  if(pathname.charAt(pathname.length-1)=='/'){
    pathname+='index.html';
  }
  fs.exists(pathname, function(exists){
    if(exists){
      switch(path.extname(pathname)){
        case '.html':
          res.writeHeader(200, {'Content-Type': 'text/html'});
          break;
      }
      
      fs.readFile(pathname, function(err, data){
        res.end(data);
      });
    } else {
      res.writeHeader('404');
      res.end('<h1>404</h1>');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
