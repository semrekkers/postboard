const env = require('./app.env');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const guard = require('./middleware/guard');

if (env.DEBUG) {
    console.log('Debugging mode enabled');
    app.use(logger('dev'));
}

if (env.ALLOW_ALL_ORIGINS) {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });
}

// Handle preflight-request
app.use((req, res, next) => {
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    next();
});

app.use(cookieParser());
app.use(bodyParser.json());

app.use(guard.guard);

app.use('/api/v1', require('./routes'));

app.listen(env.PORT, () => {
    console.log('Listening on http://localhost:' + env.PORT);
});