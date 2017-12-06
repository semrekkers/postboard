const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author_id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String }
});

module.exports = mongoose.model('post', PostSchema);