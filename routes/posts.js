const router = require('express').Router();

const Post = require('../models/post');
const lib = require('../lib');

router.post('/', (req, res) => {
    let postForm = req.body;
    postForm.user_id = req.context.userId;
    let post = new Post(postForm);

    post.save()
        .then((p) => {
            res.status(200).json({ _id: p._id });
        })
        .catch((err) => {
            lib.handleError(req, 500, err);
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

// TODO: PATCH

router.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

module.exports = router;