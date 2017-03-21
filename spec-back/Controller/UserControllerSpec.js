const userController = require('../../dev-back/Controller/UserController')

describe('UserController', () => {

    describe('=> emailValidator', () => {

        it('Should return true', next => {
            let result = userController.emailValidator('left.part@domain.nam')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false no @', next => {
            let result = userController.emailValidator('left.partdomain.nam')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false no left part', next => {
            let result = userController.emailValidator('@domain.nam')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false no domain name', next => {
            let result = userController.emailValidator('left.part@')
            expect(result).toBeFalsy()
            next()
        })

    })

    describe('=> passwordValidator', () => {

        it('Should return true', next => {
            let result = userController.passwordValidator('Ab!2t')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because value smaller than 5', next => {
            let result = userController.passwordValidator('Ab!2')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because value no contains uppercase', next => {
            let result = userController.passwordValidator('ab!2t')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because value no contains lowercase', next => {
            let result = userController.passwordValidator('AB!2T')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because value no contains number', next => {
            let result = userController.passwordValidator('Ab!at')
            expect(result).toBeFalsy()
            next()
        })

        it('Should return false because value no contains special char', next => {
            let result = userController.passwordValidator('Aba2t')
            expect(result).toBeFalsy()
            next()
        })
    })

    describe('=> passwordConfirm', () => {

        it('Should return true', next => {
            let result = userController.passwordConfirm('left.part@domain.nam', 'left.part@domain.nam')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because values are unlike', next => {
            let result = userController.passwordConfirm('left.part@domain.nam', 'tfel.part@domain.nam')
            expect(result).toBeFalsy()
            next()
        })
    })

    describe('=> passwordHash', () => {

        it('Should return right hash', next => {
            let result = userController.passwordHash('Ab!2t')
            expect(result).toBe('850cc1c35740efda0875e50ce5b7d8ee78c893a5e0e9a19f73c9075b05fb45d9')
            next()
        })

        it('Should return false because hash are unlike', next => {
            let result = userController.passwordHash('AB!2t')
            expect(result).not.toBe('850cc1c35740efda0875e50ce5b7d8ee78c893a5e0e9a19f73c9075b05fb45d9')
            next()
        })
    })
})