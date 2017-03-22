const urlController = require('../dev/UrlController')

const expectedData = new Array()
let urlSample1 = new UrlModel({
    url: 'http://www.google.com',
    urlMinified: 'http://momo-bibi/qsdf32',
    userId: 999
})
let urlSample2 = new UrlModel({
    url: 'http://www.azer.fr',
    urlMinified: 'http://momo-bibi/65azer',
    userId: 999
})
expectedData.push(urlSample1)
expectedData.push(urlSample2)

describe("urlController", () => {

    beforeEach(next => {
        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
            console.log('beforeEach : connected')

            urlSample1.save((err) => {
                if (err) throw err
            })
            urlSample2.save((err) => {
                if (err) throw err
            })

        })
        next()
    })


    afterEach(next => {
        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {
            console.log('afterEach : connected')

            UrlModel.remove({ userId: 999 }, (err, response) => {
                if (err) throw err
            })
        })
        next()
    })


    describe("=> getAll", () => {
        it("Should return ... ", next => {

            const req = {
                params: {
                    userId: 1
                }
            }

            const res = {
                status: (code) => {
                    return {
                        send: (data) => {
                            expect(code).toBe(200)
                            expect(data).toEqual(expectedData)
                            expect(data[0].userId).toBe(req.params.userId)
                            next()
                        }
                    }
                }
            }

            urlController.getUrlsAction(req, res)

        })
    })

    /*
    describe("=> getAll", () => {
        it("Should return array of url", next => {
 
            const req = {
                query: {
                    userId: 1
                }
            }
            const res = {
                status: (code) => {
                    return {
                        send: (view, data) => {
 
                            const data = [
                                {
                                    _id: 'zae3r21zae23rz',
                                    url: 'http://www.google.com',
                                    urlMinified: 'http://momo-bibi/qsdf32',
                                    userId: 1,
                                },
                                {
                                    _id: '56sdfqs5',
                                    url: 'http://www.azer.fr',
                                    urlMinified: 'http://momo-bibi/65azer',
                                    userId: 1,
                                }
                            ]
 
                            expect(code).toBe(200)
                            expect(data.name).toBe(req.query.userId)
                            next()
                        }
                    }
                }
            }
 
            urlController.getAll(req, res)
            next()
        })
    })*/
})