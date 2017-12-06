const env = require('./app.env');

const mongoose = require('mongoose');

const mongooseConn = mongoose.createConnection(env.MONGODB_URL, (err) => {
    if (err === undefined) {
        console.log('Connected to MongoDB');
    } else {
        console.log('ERROR: while connecting to MongoDB: ' + err);
        process.exit(1);
    }
})

module.exports = {
    mongoose: mongooseConn
};