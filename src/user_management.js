let db = require('./db');
function login(req, res) {
    if (req.method !== 'POST') {
        res.writeHead(405, {"Content-Type": "text/html"});
        res.end('<h1>Method Not Allowed</h1>');
        return;
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        let requestContent;
        try {
            requestContent = JSON.parse(body);
        } catch (e) {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end('<h1>Bad Request</h1>');
            return;
        }

        if (!requestContent || !requestContent.username || !requestContent.password || !requestContent.isLogin) {
            res.writeHead(400, { "Content-Type": "text/html" });
            res.end('<h1>Request missing headers</h1>');
            return;
        }

        const { username, password, isLogin } = requestContent;
        let result;
        let error_code;

        if (isLogin) {
            [result, error_code] = db.login(username, password);
        } else {
            [result, error_code] = db.signup(username, password);
        }


        res.writeHead(200);
        res.end(JSON.stringify({"success": result, "error_code": error_code}));
    });
}

module.exports = { login };