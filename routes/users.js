const env = require('../app.env');

const router = require('express').Router();

const User = require('../models/user');
const lib = require('../lib');

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
            lib.handleError(res, 400, err);
        });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    if (id == 'current') {
        id = req.context.userId;
    }
    User.findById(id, '_id name first_name last_name')
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

// TODO: PATCH

router.delete('/:id', (req, res) => {
    if (req.context.admin || req.context.userId === req.params.id) {
        User.findByIdAndRemove(req.params.id)
            .then(() => {
                res.sendStatus(200);
            })
            .catch((err) => {
                lib.handleError(res, 400, err);
            });
    
        // TODO: Token must be invalidated now.

    } else {
        lib.handleError(res, 401, 'Unauthorized');
    }
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