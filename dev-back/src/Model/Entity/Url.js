/**
 * Url Entity
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Url = new Schema({
    url: String,
    urlMinified: String,
    idUser: String
});

var UrlModel = mongoose.model('user', user);

module.exports(UrlModel);