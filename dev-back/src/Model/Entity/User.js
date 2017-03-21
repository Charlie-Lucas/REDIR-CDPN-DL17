/**
 * User Entity
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var user = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

var UserModel = mongoose.model('user', user);

module.exports(UserModel);