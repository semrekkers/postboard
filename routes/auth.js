const env = require('../app.env');

const router = require('express').Router();
const guard = require('../middleware/guard');

const User = require('../models/user');

router.post('/signup', (req, res) => {
    if (!env.ALLOW_SIGNUP) {
        res.status(403).json({ message: 'sign-up is closed' });
        return;
    }

    let user = new User(req.body);

    setPassword(user, req.body)
        .then(() => checkUser(user))
        .then(() => user.save())
        .then((u) => {
            res.status(200).json({ _id: u._id });
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});

router.post('/auth', (req, res) => {
    checkLogin(req.body)
        .then((cred) => {
            return User.findOne({ name: cred.username })
                .then((user) => {
                    return { user: user, cred: cred };
                });
        })
        .then((userCred) => {
            if (!userCred.user) {
                return Promise.reject(new Error('invalid login'));
            }
            if (userCred.user.comparePassword(userCred.cred.password)) {
                guard.grant(res, userCred.user._id);
            } else {
                return Promise.reject(new Error('invalid login'));
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
            return reject(new Error('invalid login'));
        }
        return resolve(cred);
    });
}

function setPassword(user, reqBody) {
    return new Promise((resolve, reject) => {
        if (!reqBody.password) {
            reject(new Error('password not provided'));
        } else {
            user.setPassword(reqBody.password);
            resolve(user);
        }
    });
}

function checkUser(user) {
    return new Promise((resolve, reject) => {
        user.validate()
            .then(() => {
                return User.count({ name: user.name });
            })
            .then((n) => {
                if (n > 0) {
                    return reject(new Error('user already exists'));
                }
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = router;