const userController = require('../../dev-back/Controller/UserController');

describe('UserController', () => {

    describe('=> emailValidator', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false no @', next => {
            next();
        });

        it('Should return false no left part', next => {
            next();
        });

        it('Should return false no domain name', next => {
            next();
        });

    });

    describe('=> passwordValidator', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false because value smaller than 5', next => {
            next();
        });

        it('Should return false because value no contains uppercase', next => {
            next();
        });

        it('Should return false because value no contains lowercase', next => {
            next();
        });

        it('Should return false because value no contains number', next => {
            next();
        });

        it('Should return false because value no contains special char', next => {
            next();
        });
    });

    describe('=> passwordConfirm', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false because values are unlike', next => {
            next();
        });
    });

    describe('=> passwordHash', () => {

        it('Should return true', next => {
            next();
        });

        it('Should return false because hash are unlike', next => {
            next();
        });
    });
});