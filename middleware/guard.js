const env = require('../app.env');

const jwt = require('jsonwebtoken');

const cookieName = 'postboard_session_token';

function guard(req, res, next) {
    if (req.method == 'POST' && (req.path == '/api/v1/sessions' || req.path == '/api/v1/users')) {
        next();
        return;
    }

    try {
        let token = req.cookies[cookieName];
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
    }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES });
    res.cookie(cookieName, token, { httpOnly: true, secure: !env.INSECURE_COOKIE });
    res.status(200).json({ token: token });
}

module.exports = {
    guard: guard,
    grant: grant,
};