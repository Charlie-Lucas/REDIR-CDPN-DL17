/******************** Modules ********************/
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./src/Router/Router');


/******************* Variables *******************/
const app = express(); //one can type also require('express')();
const port = process.argv[2] || 3000;


/******************* Middleware *******************/
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //express().use(..)

// parse application/json
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'dev-front')));

/*app.use(function(req,res, next){
 console.log('test de passage obligatoire');
 next();
 })*/


/****************** Templates *********************/
//app.set('view engine', 'pug');
//app.set('views', path.join(__dirname, 'src', 'views'));


/******************* Router ***********************/
app.use(router);

app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Something is broken');
});


/******************* Listener ********************/
app.listen(port, (err)=>{
    if (!err) {
        process.stdout.write('Server is listening on port: ' + port +'\n');
    } else {
        throw err;
    }
});
