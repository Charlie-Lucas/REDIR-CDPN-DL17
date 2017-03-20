module.exports = {
    isNoGood: (value) => {
        if(value === 1){
            return false;
        } else if (value === 2){
            return true;
        }
    }
};