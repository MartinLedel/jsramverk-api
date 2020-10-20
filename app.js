const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const app = express();
const port = 1337;

const users = require('./routes/users');
const reports = require('./routes/reports');
const chat = require('./routes/chat');

app.use(cors({credentials: true, origin: 'https://ml-jsramverk.me'}));
// app.use(cors());

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', users);
app.use('/reports/', reports);
app.use('/chat/', chat);

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// Start up server
const server = app.listen(port, () => console.log(`Api listening on port ${port}!`));

module.exports = server;
