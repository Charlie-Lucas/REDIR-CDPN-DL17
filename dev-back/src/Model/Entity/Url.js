/**
 * Url Entity
 */

var Url = mongoose.model('Url', {
    url: String,
    urlMinified: String,
    idUser: String
});