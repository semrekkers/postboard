const env = require('./app.env');

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const guard = require('./middleware/guard');

if (env.DEBUG) {
    console.log('Debugging mode enabled');
    app.use(logger("dev"));
}

app.use(cookieParser());
app.use(bodyParser.json());

app.use(guard.guard);

app.use('/', require('./routes/auth'));

app.listen(env.PORT, () => {
    console.log('Listening on http://localhost:' + env.PORT);
});