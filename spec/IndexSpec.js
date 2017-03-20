const index = require('../dev/Index');

describe("Index", () => {
    describe("=> isNoGood", () => {
        it("Should return false", next => {
            let result = index.isNoGood(1);

            expect(result).toBeFalsy();

            next();
        });

        it("Should return true", next => {
            let result = index.isNoGood(2);

            expect(result).toBeTruthy();

            next();
        });
    });
});