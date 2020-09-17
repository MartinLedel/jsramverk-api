const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const app = express();
const port = 1337;

const users = require('./routes/users');
const reports = require('./routes/reports');

app.use(cors({credentials: true, origin: 'https://ml-jsramverk.me'}));

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', users);
app.use('/reports', reports);

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

// Start up server
app.listen(port, () => console.log(`API listening on port ${port}!`));
