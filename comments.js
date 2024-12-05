// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function (req, res) {
    var parseObj = url.parse(req.url, true);
    var pathname = parseObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else if (pathname === '/post') {
        var comment = parseObj.query;
        comment.dateTime = '2018-10-25 16:23:23';
        comments.unshift(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else if (pathname.indexOf('/public/') === 0) {
        fs.readFile('.' + pathname, function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    } else {
        fs.readFile('./404.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found');
            }
            res.end(data);
        });
    }
});
server.listen(3000, function () {
    console.log('Server is running...');
});