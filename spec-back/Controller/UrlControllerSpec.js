const urlController = require('../../dev-back/src/Controller/UrlController')

describe('UrlController', () => {

    describe('=> urlValidator', () => {

        it('Should return true', next => {
            let result = urlController.urlValidator('http://www.google.fr')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because no domain', next => {
            let result = urlController.urlValidator('http://www..fr')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because no tld', next => {
            let result = urlController.urlValidator('http://www.google.f')
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
            expect(result.error).toBe('')
            next()
        })

        it('Should return false because value is NaN', next => {
            let result = urlController.idValidator('999')
            expect(result.error).toBe('')
            next()
        })
    })
})