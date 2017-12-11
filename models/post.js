const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    date: { type: Date, required: true, default: Date.now },
    text: { type: String }
});

const PostSchema = new Schema({
    user_id: { type: ObjectId, required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    content: { type: String },
    edited: { type: Date },

    comments: { type: [CommentSchema] }
});

module.exports = mongoose.model('post', PostSchema);