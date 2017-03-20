module.exports = {
    index: (req, res) =>{
        res.status(200).render('index/index', {
            name: req.query.name
        })
    }
};