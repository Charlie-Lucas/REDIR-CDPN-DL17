describe("Integration", ()=>{
    describe("=>action1", () =>{
        beforeEach( next =>{
            console.log('Before');
            next();
        });
        afterEach( next =>{
            console.log('After');
            next();
        });
        it("context 1", next => {
            console.log("Unit test Action1.1");
            next();
        });
        it("context 2", next => {
            console.log("Unit test Action1.2");
            next();
        })
    });

});