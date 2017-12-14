const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    author: { type: ObjectId, required: true, ref: 'User' },
    date: { type: Date, required: true, default: Date.now },
    text: { type: String }
});

const PostSchema = new Schema({
    author: { type: ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    subjects: { type: [String], default: [] },
    content: { type: String },
    edited: { type: Date },

    comments: { type: [CommentSchema] }
});

module.exports = mongoose.model('Post', PostSchema);