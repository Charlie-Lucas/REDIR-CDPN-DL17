/**
 * Url Entity
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let url = new Schema({
    url: { type: String },
    urlMinified: { type: String },
    userId : {type: String }
});

let UrlModel = mongoose.model('url', url);

module.exports = UrlModel;