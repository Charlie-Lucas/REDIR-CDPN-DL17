const urlController = require('../../dev-back/Controller/UrlController')

describe('UrlController', () => {

    describe('=> urlValidator', () => {

        it('Should return true', next => {
            let result = urlController.urlValidator('http://www.google.fr')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because no protocol', next => {
            let result = urlController.urlValidator('www.google.fr')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because no sub domain', next => {
            let result = urlController.urlValidator('http://google.fr')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because no domain', next => {
            let result = urlController.urlValidator('http://www..fr')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because no tld', next => {
            let result = urlController.urlValidator('http://www.google')
            expect(result).toBeFalsy()
            next()
        })

    })

    describe('=> idValidator', () => {

        it('Should return true', next => {
            let result = urlController.idValidator(999)
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because value is null', next => {
            let result = urlController.idValidator(null)
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because value is NaN', next => {
            let result = urlController.idValidator('999')
            expect(result).toBeFalsy()
            next()
        })
    })
})