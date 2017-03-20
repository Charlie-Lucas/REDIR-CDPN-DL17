module.exports = {
    index: (req, res) => {
        console.log(req);
        console.log(res);

        res.status(200).render('index/index', {
            name: req.query.name
        })
    }
};