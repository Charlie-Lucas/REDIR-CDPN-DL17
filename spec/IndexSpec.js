const Index = require('../dev/Index');

describe("Index", () => {
    describe("=> isNoGood", () => {
        /**
         * 
         */
        it("Should return false", next => {
            let result = Index.isNoGood(1);

            expect(result).toBeFalsy();

            next();
        });

        it("Should return true", next => {
            let result = Index.isNoGood(2);

            expect(result).toBeTruthy();

            next();
        });
    });
});