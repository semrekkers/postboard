const env = require('../app.env');

const router = require('express').Router();

const User = require('../models/user');

router.post('/', (req, res) => {
    if (!env.ALLOW_SIGNUP) {
        res.status(405).json({ message: 'Sign-up is closed' });
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

function setPassword(user, reqBody) {
    return new Promise((resolve, reject) => {
        if (!reqBody.password) {
            reject(new Error('Password not provided'));
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
                    return reject(new Error('User already exists'));
                }
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = router;