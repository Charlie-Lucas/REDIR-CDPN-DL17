const IndexCtrl = require('../dev/IndexCtrl');

describe("IndexCtrl", () => {
    describe("=> index", () => {
        it("Should return index view with data", next => {
            const req = {
                query: {
                    name: 'bibi'
                }
            };
            const res = {
                status: (code) =>{
                    return {
                        render: (view, data)=>{
                            expect(code).toBe(200);
                            expect(view).toBe('index/index');
                            expect(data.name).toBe('bibi');
                            next();
                        }
                    }
                }
            };

            IndexCtrl.index(req, res);
        });
    });
});