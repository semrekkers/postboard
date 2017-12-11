const router = require('express').Router();

router.use('/sessions', require('./sessions'));
router.use('/users', require('./users'));

module.exports = router;