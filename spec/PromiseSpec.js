const Prom = require('../dev/Promise');

describe("Promise", () => {
    describe("=> action1", ()=>{
        it("Should return success message", next => {
            Prom.action1(true).then(
                result =>{
                    expect(result).toBe('success');
                    next();
                }
            );
        });
        it("Should return error message", next => {
            Prom.action1(false)
                .then(() =>{})
                .catch(
                    err => {
                        expect(err).toBe('error');
                        next();
                    }
                );
        })
    });
});