const userController = require('../../dev-back/src/Controller/UserController')

describe('UserController', () => {

    describe('=> emailValidator', () => {

        it('Should return true', next => {
            userController.emailValidator('left.part@domain.nam', (result) => {
                expect(result).toBeTruthy()
                next()
            })
        })

        it('Should return false already exist @', next => {
            // TODO add email
            userController.emailValidator('left.part@domain.nam', (result) => {
                expect(result.error).toBe('Votre email existe déjà')
                next()
            })
        })

        it('Should return false no @', next => {
            userController.emailValidator('left.partdomain.nam', (result) => {
                expect(result.error).toBe('Votre email n\'est pas valide')
                next()
            })
        })

        it('Should return false no left part', next => {
            userController.emailValidator('@domain.nam', (result) => {
                expect(result.error).toBe('Votre email n\'est pas valide')
                next()
            })
        })

        it('Should return false no domain name', next => {
            userController.emailValidator('left.part@', (result) => {
                expect(result.error).toBe('Votre email n\'est pas valide')
                next()
            })
        })

    })

    describe('=> passwordValidator', () => {

        const errorValue = 'Le password doit contenir 5 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial(!, $, #,?)'

        it('Should return true', next => {
            let result = userController.passwordValidator('Ab!2t')
            expect(result).toBeTruthy()
            next()
        })

        it('Should return false because value smaller than 5', next => {
            let result = userController.passwordValidator('Ab!2')
            expect(result.error).toBe(errorValue)
            next()
        })

        it('Should return false because value no contains uppercase', next => {
            let result = userController.passwordValidator('ab!2t')
            expect(result.error).toBe(errorValue)
            next()
        })

        it('Should return false because value no contains lowercase', next => {
            let result = userController.passwordValidator('AB!2T')
            expect(result.error).toBe(errorValue)
            next()
        })

        it('Should return false because value no contains number', next => {
            let result = userController.passwordValidator('Ab!at')
            expect(result.error).toBe(errorValue)
            next()
        })

        it('Should return false because value no contains special char', next => {
            let result = userController.passwordValidator('Aba2t')
            expect(result.error).toBe(errorValue)
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
            expect(result).toBe('sha1$252ce0b3$1$bc4f5b8593acd24c12b70b74d423f394a2dc073e')
            next()
        })

        it('Should return false because hash are unlike', next => {
            let result = userController.passwordHash('AB!2t')
            expect(result).not.toBe('sha1$252ce0b3$1$bc4f5b8593acd24c12b70b74d423f394a2dc073e')
            next()
        })
    })
})