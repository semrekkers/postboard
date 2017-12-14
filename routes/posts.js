const router = require('express').Router();

const Post = require('../models/post');
const lib = require('../lib');

const userProjection = '_id name first_name last_name';

router.post('/', (req, res) => {
    let postForm = req.body;
    postForm.author = req.context.userId;
    let post = new Post(postForm);

    post.save()
        .then((p) => {
            res.status(200).json({ _id: p._id });
        })
        .catch((err) => {
            lib.handleError(req, 500, err);
        });
});

router.get('/', (req, res) => {
    Post.find().limit(100).populate('author', userProjection)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .populate('author', userProjection)
        .populate('comments.author', userProjection)
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

router.put('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post.author != req.context.userId) {
                return Promise.reject(new Error('Current user is not the author'));
            }
            post.title = req.body.title;
            post.content = req.body.content;
            post.subjects = req.body.subjects;
            post.edited = Date.now();
            return post.save();
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post.author != req.context.userId) {
                return Promise.reject(new Error('Current user is not the author'));
            }
            return post.remove();
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

/*
 *
 *      Comments
 * 
 */

router.post('/:postId/comments', (req, res) => {
    Post.findById(req.params.postId)
        .then((post) => {
            let comment = req.body;
            comment.author = req.context.userId;
            post.comments.push(comment);
            return post.save();
        })
        .then((post) => {
            return Post.populate(post, [{ path: 'author' }, { path: 'comments.author' }]);
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

router.delete('/:postId/comments/:id', (req, res) => {
    Post.findById(req.params.postId)
        .then((post) => {
            if (post.author != req.context.userId) {
                return Promise.reject(new Error('Current user is not the author'));
            }
            post.comments.id(req.params.id).remove();
            return post.save();
        })
        .then((post) => {
            return Post.populate(post, [{ path: 'author' }, { path: 'comments.author' }]);
        })
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((err) => {
            lib.handleError(res, 400, err);
        });
});

module.exports = router;