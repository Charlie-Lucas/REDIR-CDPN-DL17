module.exports = {
    actionWithService(service) {
        if(service.save(true)) {
            return 'success'
        }
    }
}