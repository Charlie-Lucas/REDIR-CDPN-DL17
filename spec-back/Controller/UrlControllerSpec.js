const urlController = require('../../dev-back/Controller/UrlController');

describe('UrlController', () => {

    describe('=> urlValidator', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false no tld', next => {
            next();
        });

        it('Should return false no domain name', next => {
            next();
        });

    });

    describe('=> idValidator', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false because value is null', next => {
            next();
        });

        it('Should return false because value is NaN', next => {
            next();
        });
    });
});