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

module.exports = {
    handleError: handleError
};