let http = require('http');
let fs = require('fs');
let db = require('./db');
let user_management = require('./user_management');

const management_page = fs.readFileSync('./src/management.html', 'utf8');
const login_page = fs.readFileSync('./src/login.html', 'utf8');

function showPage(res, page) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(page);
}

http.createServer(function (req, res) {
    if (req.url === "/") {
        showPage(res, management_page);
    } else if (req.url === "/login") {
        if (req.method === 'GET') {
            showPage(res, login_page);
        } else {
            user_management.login(req, res);
        }
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!');
    }
}).listen(8080);