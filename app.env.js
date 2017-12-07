require('dotenv').config();

const mongoose = require('mongoose');

const env = {
    DEBUG: Boolean(process.env.DEBUG),
    PORT: process.env.PORT || '3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/postboard',
    GUARD_DISABLED: Boolean(process.env.GUARD_DISABLED),
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    INSECURE_COOKIE: Boolean(process.env.SECURE_COOKIE),
    ALLOW_SIGNUP: Boolean(process.env.ALLOW_SIGNUP),
};

mongoose.Promise = global.Promise;

mongoose.connect(env.MONGODB_URI, { useMongoClient: true }, (err) => {
    if (err) {
        console.error('ERROR: while connecting to MongoDB: ' + err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});

module.exports = env;