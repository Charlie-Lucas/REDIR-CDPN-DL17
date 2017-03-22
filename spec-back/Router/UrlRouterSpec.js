/*const urlRouter = require('../../spec-back/UrlRouter');

describe("urlRouter", () => {

    describe("=> get one", () => {
        it("Should return one url", next => {
            const req = {

                query: {
                    id: '',
                }
            };
            const res = {
                status: (code) => {
                    return {
                        render: (view, data) => {
                            expect(code).toBe(200);
                            expect(view).toBe('index/index');
                            expect(data.name).toBe('bibi');
                            expect(data.name).toBe('bibi');
                            expect(data.name).toBe('bibi');
                            next();
                        }
                    }
                }
            };

            urlRouter.index(req, res);
        });
    });

    describe("=> get all", () => {

        beforeEach(next => {
            console.log('Before');
            // TODO fill some url
            next();
        });
        afterEach(next => {
            console.log('After');
            // TODO clean
            next();
        });

        it("Should return list of urls", next => {
            const req = {
                query: {
                    userId: ''
                }
            };
            const res = {
                status: (code) => {
                    return {
                        render: (view, data) => {
                            expect(code).toBe(200);
                            expect(view).toBe('index/index');
                            expect(data.name).toBe('bibi');
                            expect(data.name).toBe('bibi');
                            expect(data.name).toBe('bibi');
                            next();
                        }
                    }
                }
            };

            urlRouter.index(req, res);
        });
    });


});*/