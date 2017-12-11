const env = require('../app.env');

const jwt = require('jsonwebtoken');
const lib = require('../lib');

function guard(req, res, next) {
    if (req.method == 'POST' && (req.path == '/api/v1/sessions' || req.path == '/api/v1/users')) {
        next();
        return;
    }

    parseToken(req)
        .then((token) => {
            return jwt.verify(token, env.JWT_SECRET);
        })
        .then((payload) => {
            req.context = {
                userId: payload.usr,
                admin: payload.admin
            };
            next();
        })
        .catch((err) => {
            lib.handleError(res, 401, err, 'Invalid token');
        });
}

function grant(res, userId, admin) {
    let token = jwt.sign({
        usr: userId,
        admin: Boolean(admin)
    }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES });
    res.status(200).json({ token: token });
}

function parseToken(req) {
    return new Promise((resolve, reject) => {
        let authorization = req.params.authorization;
        if (!authorization) {
            return reject(new Error('Authorization header not provided'));
        }
        let parts = authorization.split(' ');
        if (parts[0] !== 'Bearer' || !parts[1]) {
            return reject(new Error('Invalid Authorization header'));
        }
        resolve(parts[1]);
    });
}

module.exports = {
    guard: guard,
    grant: grant,
};