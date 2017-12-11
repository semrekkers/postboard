const router = require('express').Router();
const guard = require('../middleware/guard');

const User = require('../models/user');

const errIvalidLogin = new Error('Invalid login');

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
                return Promise.reject(errIvalidLogin);
            }
            if (userCred.user.comparePassword(userCred.cred.password)) {
                guard.grant(res, userCred.user._id);
            } else {
                return Promise.reject(errIvalidLogin);
            }
        })
        .catch((err) => {
            res.status(401).json({ message: err.message });
        });
});

function checkLogin(login) {
    return new Promise((resolve, reject) => {
        var cred = {
            username: login.username,
            password: login.password
        };
        if (!cred.username || !cred.password) {
            return reject(errIvalidLogin);
        }
        return resolve(cred);
    });
}

module.exports = router;