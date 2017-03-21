const url = require('../Model/Entity/Url.js');

function UrlController() {

}

/*
 * Validators
 */

UrlController.prototype.urlValidator = function (url) {

    /*
     * Filtres URL HTTP/Sans HTTP
     */

    let filter1 = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let filter2 = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    let regex1 = new RegExp(filter1);
    let regex2 = new RegExp(filter2);

    if (url.match(regex1) || url.match(regex2)) {
        return true;
    } else {
        return false;
    }
};

UrlController.prototype.idValidator = function (id) {

    /*
     * Filtre ID
     */

    let filter1 = /^[a-z0-9]{24}/;

    let regex1 = new RegExp(expression);

    if (url.match(regex1)) {
        return true;
    } else {
        return false;
    }

};

UrlController.prototype.minifyUrl = function () {

    /*
     * 6 Caractères aléatoires pour les URLS minifiées
     */

    let generatedUrl = "";
    let randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
        generatedUrl += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }

    generatedUrl = 'http://'+ BASE_URL+'/'+generatedUrl;
    // Exemple : http://momo-bibi.com/AF94D6

    return generatedUrl;

};

UrlController.prototype.addAction = function (req, res) {
    let url = req.params.url;

    if (this.urlValidator(url) === true) {
        this.minifyUrl();

        /*
         * AJOUT EN BDD
         */
    }
    else {
        console.log('Url invalide !')
    }
};

UrlController.prototype.removeAction = function (req, res) {

};

UrlController.prototype.getUrlsAction = function (req, res) {

};