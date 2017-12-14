const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');

const FavoriteSchema = new Schema({
    post: { type: ObjectId, required: true, ref: 'Post' },
    at: { type: Date, required: true, default: Date.now }
});

const UserSchema = new Schema({
    name: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    hashed_password: { type: String },
    admin: { type: Boolean },
    interests: { type: [String], default: [] },

    favorites: { type: [FavoriteSchema] }
});

const saltRounds = 10;

UserSchema.methods.setPassword = function(passwd) {
    this.hashed_password = bcrypt.hashSync(passwd, saltRounds);
};

UserSchema.methods.comparePassword = function(passwd) {
    return bcrypt.compareSync(passwd, this.hashed_password);
};

module.exports = mongoose.model('User', UserSchema);