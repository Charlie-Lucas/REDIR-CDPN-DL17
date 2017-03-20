const Pro = require('../dev/Promise');

describe("Promise", () => {
    describe("=> bibi", () => {
        it("Should return success message", next => {
            Pro.action1(true).then(
                result => {
                    expect(result).toBe('success');

                    next();
                }
            );
        });

        it("Should return error message", next => {
            Pro.action1(false)
                .then(() => { })
                .catch(
                    err => {
                        expect(err).toBe('error');

                        next();
                    }
                )
        });
    });
});