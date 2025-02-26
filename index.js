const http = require('node:http');
const url = require('url');
const fs = require('fs');

const display404 = (res) => {
  const location404 = './404.html';
  fs.readFile(location404, function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
};

const redirectHTML = (filename, res) => {
  fs.readFile(filename, function(err, data) {
    if (err) {
      return display404(res);
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
};

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  let filename = '.' + q.pathname;

  if (filename === './'){
    filename = './index.html';
  }

  redirectHTML(filename, res);
}).listen(8080, () => {
  console.log('Link : http://localhost:8080/');
});