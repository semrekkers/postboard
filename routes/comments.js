const router = require('express').Router();

const Post = require('../models/post');
const lib = require('../lib');

router.post('/', (req, res) => {
    Post.findById(req.params.postId)
        .then((post) => {
            let comment = req.body;
            comment.user_id = req.context.userId;
            post.comments.push(comment);
            return post.save();
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

// TODO: PATCH

router.delete('/:id', (req, res) => {
    Post.findById(req.params.postId)
        .then((post) => {
            post.comments.id(req.params.id).remove();
            return post.save();
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

module.exports = router;