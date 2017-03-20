const user = require('../Model/Entity/User.js');

function UserController(){

}

UserController.prototype.emailValidator = function (email){
    if(){

    }
};

UserController.prototype.passwordValidator = function(password){

};

UserController.prototype.passwordConfirm = function(password){

};

//get register view
UserController.prototype.registerAction = function(req, res){
    res.render('/register', {});
};

//on submit
UserController.prototype.signUpAction = function(req, res){
    let post = req.body;
    let _self = this;
    if (_self.emailValidator(post.email)){
        if( _self.passwordConfirm(post.password) ){
            db.user.insert({
                email: post.email,
                password:post.password
            })
        }
    }
};

UserController.prototype.connectAction = function(req, res){

};

UserController.prototype.loginAction = function(req, res){

};

UserController.prototype.logoutAction = function(req, res){

};

UserController.prototype.indexAction = function(req, res){

};