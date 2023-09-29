const http = require('http');
const fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
 
const server = http.createServer((req, res) => {
  let _url = req.url;
  let queryData = url.parse(_url, true).query;
  let title = queryData.id;
  if(_url == '/'){
    title = 'Welcome';
  }
  if(_url == '/favicon.ico'){
    res.statusCode = 404;
    res.end();
    return;
  }
  res.statusCode = 200;
//   res.end(fs.readFileSync(__dirname + _url));


  fs.readFile(`./data/${title}.txt`, 'utf-8', (err, data) => {
    if(err) throw err;

    let template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=html">HTML</a></li>
          <li><a href="/?id=css">CSS</a></li>
          <li><a href="/?id=javascript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${data}</p>
      </body>
      </html>  
    `;
    res.end(template);
    // console.log(data);
  })
});
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 