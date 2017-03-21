/**
 * Url Entity
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let url = new Schema({
    url: { type: String , required: true},
    urlMinified: { type: String , required: true},
    userId : {type: String , required: true}
});

let UrlModel = mongoose.model('url', url);

module.exports = UrlModel;