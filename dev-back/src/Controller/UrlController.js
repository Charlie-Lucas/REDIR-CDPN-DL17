const url = require('../Model/Entity/Url.js');

const config = require('../Config/Config.js');

const mongoose = require('mongoose');

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

UrlController.prototype.genMinStr = function () {

    /*
     * 6 Caractères aléatoires pour les URLS minifiées
     */

    let generatedUrl = "";
    let randomChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
        generatedUrl += randomChar.charAt(Math.floor(Math.random() * randomChar.length));
    }

    generatedUrl = 'http://' + config.BASE_URL + '/' + generatedUrl;
    // Exemple : http://momo-bibi.com/AF94D6

    return generatedUrl;

};

/*
 * Add, Delete & Get Urls
 */

UrlController.prototype.addAction = function (req, res) {

    let url = req.params.url;
    let userId = req.params.userId;

    if (this.urlValidator(url) === true) {
        let urlMin = this.genMinStr();

        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
            console.log('connected');

            let urlSample = new UrlModel({
                url: url,
                urlMinified: urlMin,
                userId: userId
            })
        });
    }
    else {
        console.log('Url invalide !')
    }
};

UrlController.prototype.removeAction = function (req, res) {

    let urlId = req.params.urlId;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.remove({_id: urlId}, (err, response) => {
            console.log(err, response)
        })
    });
};

UrlController.prototype.getUrlsAction = function (req, res) {

    let userId = req.params.userId;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.find({userId: userId}, (err, response) => {
            console.log(response)
        });
    });
};

UrlController.prototype.getBigUrlByMinUrl = function (req, res) {

    let urlMin = req.params.urlMin;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.find({urlMinified: urlMin}, (err, response) => {
            console.log(response[0].url)

        });
    });
};