const IntegrationClass = require('../dev/IntegrationClass.js');

describe("IntegrationClass", ()=>{
    describe("=> actionWithService", ()=>{
        it("Should return success", next =>{
            const mockService = {
                save: (value) =>{
                    return true;
                }
            };
            let result = IntegrationClass.actionWithService(mockService);
            expect(result).toBe('success');
            next();
        })
    })
});