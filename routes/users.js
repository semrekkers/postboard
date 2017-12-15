const env = require('../app.env');

const router = require('express').Router();

const User = require('../models/user');
const lib = require('../lib');

const defaultProjection = '_id name first_name last_name admin interests favorites';

router.post('/', (req, res) => {
    if (!env.ALLOW_SIGNUP) {
        res.status(405).json({ message: 'Sign-up is closed' });
        return;
    }

    let user = new User(req.body);

    let session = env.neo4j.session();
    setPassword(user, req.body)
        .then(() => checkUser(user))
        .then(() => user.save())
        .then((user) => {
            return session.run('CREATE (u:User { _id: {_id} }) RETURN u._id AS _id', { _id: user._id.toString() });
        })
        .then((result) => {
            res.status(200).json({ _id: result.records[0].get('_id') });
            session.close();
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
    User.findById(id, defaultProjection)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

router.delete('/:id', (req, res) => {
    if (req.context.admin || req.context.userId === req.params.id) {
        let id = req.params.id;
        let session = env.neo4j.session();
        User.findByIdAndRemove(id)
            .then(() => {
                return session.run('MATCH (u:User {_id: {_id} }) DETACH DELETE u', { _id: id });
            })
            .then(() => {
                session.close();
                res.sendStatus(200);
            })
            .catch((err) => {
                lib.handleError(res, 400, err);
            });
    
        // NOTE: Token must be invalidated now.

    } else {
        lib.handleError(res, 401, 'Unauthorized');
    }
});

router.get('/:id/interests', (req, res) => {
    let userId = req.params.id;
    let session = env.neo4j.session();
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