module.exports = {
    action1: (value) => {
        return new Promise( (resolve, reject) =>{
            if(value === true ){
                resolve('success');
                return;
            }
            reject('error');
        });
    }
};