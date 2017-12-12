const router = require('express').Router();

router.use('/sessions', require('./sessions'));
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/posts/:postId/comments', require('./comments'));

module.exports = router;