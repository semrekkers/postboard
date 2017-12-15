require('dotenv').config();

const mongoose = require('mongoose');
const neo4j = require('neo4j-driver').v1;

var env = {
    DEBUG: Boolean(process.env.DEBUG),
    PORT: process.env.PORT || '3000',
    ALLOW_ALL_ORIGINS: Boolean(process.env.ALLOW_ALL_ORIGINS),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/postboard',
    NEO4J_URI: process.env.NEO4J_URI || 'bolt://localhost',
    NEO4J_USER: process.env.NEO4J_USER || 'neo4j',
    NEO4J_PASSWD: process.env.NEO4J_PASSWD || 'neo4j',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    JWT_EXPIRES: process.env.JWT_EXPIRES || '1h',
    ALLOW_SIGNUP: Boolean(process.env.ALLOW_SIGNUP),
};

// Setup mongoose
mongoose.Promise = global.Promise;
mongoose.connect(env.MONGODB_URI, { useMongoClient: true }, (err) => {
    if (err) {
        console.error('ERROR: while connecting to MongoDB: ' + err);
        process.exit(1);
    }
    console.log('Connected to MongoDB');
});

// Setup Neo4j
env.neo4j = neo4j.driver(env.NEO4J_URI, neo4j.auth.basic(env.NEO4J_USER, env.NEO4J_PASSWD));
console.log('Initialized neo4j');


module.exports = env;