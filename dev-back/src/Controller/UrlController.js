const UrlModel = require('../Model/Entity/Url.js');

const config = require('../Config/Config.js');

const mongoose = require('mongoose');

/*
 * Validators
 */

const urlValidator = (url) => {

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

const idValidator = (id) => {

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

const genMinStr = () => {

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

const addAction = (req, res) => {

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
            });

            urlSample.save((err) => {
                if (err) throw err;
                console.log('saved')
            });
        });
    }
    else {
        console.log('Url invalide !')
        res.send({
            error: "Url invalide !"
        });
    }
};

const removeAction = (req, res) => {

    let urlId = req.params.urlId;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.remove({_id: urlId}, (err, response) => {
            // ajout de "succes msg" ?
            if (err) {
                res.send({
                    error: "Echec de suppression"
                });
            }
        })
    });
};

const getUrlsAction = (req, res) => {

    let userId = req.params.userId;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.find({userId: userId}, (err, response) => {
            if (err) {
                res.send({
                    error: "Echec de suppression"
                });
            }
            res.status(200).send(response);
        });
    });
};

const getBigUrlByMinUrl = (req, res) => {

    let urlMin = req.params.urlMin;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
        console.log('connected');

        UrlModel.find({urlMinified: urlMin}, (err, response) => {
            return response[0].url;
            if (err) {
                res.send({
                    error: "Echec de suppression"
                });
            }
        });
    });
};

module.exports = {
    addAction: addAction,
    removeAction: removeAction,
    getUrlsAction: getUrlsAction,
    getBigUrlByMinUrl: getBigUrlByMinUrl
}