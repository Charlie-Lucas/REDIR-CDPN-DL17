const IntegrationClass = require('../dev/Integration');

describe('Integration', () => {
    describe('=> actionWithService', () => {
        it('Should return success', next => {
            const mockService = {
                save: (value) => {
                    return true;
                }
            };

            let result = IntegrationClass.actionWithService(mockService);

            expect(result).toBe('success');
            next()
        })
    })
});