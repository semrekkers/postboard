const env = require('../app.env');

function handleError(res, status, err, concealed) {
    let msg = err;
    if (concealed && !env.DEBUG) {
        msg = concealed;
    }
    if (msg instanceof Error) {
        msg = msg.message;
    }
    res.status(status).json({ message: msg });
}

function logError(s, err) {
    if (err instanceof Error) {
        err = err.message;
    }
    console.error('ERROR: while '+s+': '+err);
}

module.exports = {
    handleError: handleError,
    logError: logError,
};