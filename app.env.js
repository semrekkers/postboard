require('dotenv').config();

const env = {
    DEBUG: Boolean(process.env.DEBUG),
    PORT: process.env.PORT || '3000',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/postboard',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    INSECURE_COOKIE: Boolean(process.env.SECURE_COOKIE),
    ALLOW_SIGNUP: Boolean(process.env.ALLOW_SIGNUP),
};

module.exports = env;