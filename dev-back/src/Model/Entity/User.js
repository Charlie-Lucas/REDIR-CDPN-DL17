/**
 * User Entity
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

let UserModel = mongoose.model('user', user);

module.exports(UserModel);