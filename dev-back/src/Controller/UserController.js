const UserModel = require('../Model/Entity/User.js');

const emailValidator = require('email-validator');
//npm install password-hash --save
const passwordHash = require('password-hash');

const mongoose = require('mongoose');

function UserController() {

}

//validate that email is valid and verifies that email doesn't exist in database
UserController.prototype.emailValidator = function (email) {

    if (emailValidator.validate(email)) {
        // check that email is unique
        db.users.find({email: email}, (err, result) => {
            if (err) {
                res.send({
                    error: err
                });
            }
            //if result is not empty list  !=[]
            return !result.length ? true : {error: "Votre email existe déjà"};
        });
    } else {
        return {
            error: "Votre email n'est pas valide"
        };
    }
};

UserController.prototype.passwordValidator = function (password) {

    //password contains one digit, one lowercase letter, one capital letter, one special character, > 5 characters
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$#?]).{5,}/;
    if (regex.test(password)) {
        return true;
    } else {
        return {
            error: "Le password doit contenir 5 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial(!, $, #,?)"
        };
    }

};

UserController.prototype.passwordConfirm = function(password, confirmedPassword){
    return (password === confirmedPassword);
 };

UserController.prototype.passwordHash = function(password){
    return passwordHash.generate(password);
};

//on submit
UserController.prototype.signUpAction = function (req, res) {
    let post = req.body;
    let _self = this;
    if (_self.emailValidator(post.email) === true) {

        if (_self.passwordConfirm(post.password, post.passwordConfirmed)) {

            mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', () => {

                let newUser = new UserModel({email: post.email, password: _self.passwordHash(post.password)});

                newUser.save((err) => {
                    if (err) {
                        res.send({
                            error: err
                        });
                    }
                    console.log('User saved to database !');
                    res.send(newUser);
                });
            });

        }else {
            console.log("Le mot de passe doit etre le meme");
            res.send({
                error: "Le mot de passe doit etre le meme"
            });
        }

    } else {
        console.log(_self.emailValidator(post.email).error);
        res.send(_self.emailValidator(post.email));
    }
};

//on submit
UserController.prototype.loginAction = function (req, res) {
    let post = req.body;
    db.user.find({
        email: post.email
    }, (err, user) => {
        if (err) {
            console.log(err);
            res.send({
                error: err
            });
        }
        if (user) {
            if (passwordHash.verify(post.password, user.password)) {
                app.locals.user = user; //localStorage.setItem('user', user);
                res.send(user);
            } else {
                console.log('Votre mot de passe est incorrect');
                res.send({
                    error: 'Votre mot de passe est incorrect'
                });
            }
        } else {
            console.log('You have to register first');
            res.send({
                error: "Ce compte n'été pas trouvé"
            });
        }
    });

};

UserController.prototype.logoutAction = function (req, res) {
    //TODO
    res.redirect('/connect');
};

module.exports = UserController();