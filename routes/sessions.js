const router = require('express').Router();
const guard = require('../middleware/guard');
const lib = require('../lib');

const User = require('../models/user');

router.post('/', (req, res) => {
    checkLogin(req.body)
        .then((cred) => {
            return User.findOne({ name: cred.username })
                .then((user) => {
                    return { user: user, cred: cred };
                });
        })
        .then((userCred) => {
            if (!userCred.user) {
                return Promise.reject(new Error('User not found'));
            }
            if (userCred.user.comparePassword(userCred.cred.password)) {
                guard.grant(res, userCred.user._id, userCred.user.admin);
            } else {
                return Promise.reject(new Error('Wrong password'));
            }
        })
        .catch((err) => {
            lib.handleError(res, 401, err);
        });
});

function checkLogin(login) {
    return new Promise((resolve, reject) => {
        var cred = {
            username: login.username,
            password: login.password
        };
        if (!cred.username || !cred.password) {
            return reject(new Error('Invalid login form'));
        }
        return resolve(cred);
    });
}

module.exports = router;