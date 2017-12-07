const env = require('../app.env');

const jwt = require('jsonwebtoken');

function guard(req, res, next) {
    if (req.path == '/auth' || req.path == '/signup') {
        next();
        return;
    }

    try {
        let token = req.cookies.postboard_auth_token;
        let payload = jwt.verify(token, env.JWT_SECRET);
        req.context = { userId: payload.usr };
        next();
    } catch (err) {
        if (env.DEBUG) {
            res.status(401).json({ message: err.message });
        } else {
            res.status(401).json({ message: 'invalid token' });
        }
    }
}

function grant(res, userId) {
    let token = jwt.sign({
        usr: userId
    }, env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('postboard_auth_token', token, { httpOnly: true, secure: !env.INSECURE_COOKIE });
    res.status(200).json({ token: token });
}

module.exports = {
    guard: guard,
    grant: grant,
};