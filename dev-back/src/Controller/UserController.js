const express = require('express');
const app = express(); //one can type also require('express')();

const UserModel = require('../Model/Entity/User.js');

const validator = require('email-validator');
//npm install password-hash --save
const hash = require('password-hash');

const mongoose = require('mongoose');

//validate that email is valid and verifies that email doesn't exist in database
const emailValidator = (email, callback) => {
    console.log('Email Validator enter in function');
    if (validator.validate(email)) {
        // check that email is unique
        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
            if(err){
                res.status(500).send({
                    error: err
                });
            }

            UserModel.find({email: email}, (err, result) => {
                console.log('Error' + err);
                console.log('Result' + result);
                if (err) {
                    res.status(500).send({
                        error: err
                    });

                }

                //if result is not empty list  !=[]
                callback(!result.length ? true : {error: "Votre email existe déjà"});
            });
        });
    } else {
        callback({
            error: "Votre email n'est pas valide"
        });
    }
};

const passwordValidator = (password)=> {

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

const passwordConfirm = (password, confirmedPassword)=>{
    return (password === confirmedPassword);
 };

const passwordHash = (password) => {
    return hash.generate(password);
};

//on submit
const signUpAction = (req, res) => {
    console.log('ok');
    let post = req.body;
    emailValidator(post.email, (emailStatus)=>{
        console.log(emailStatus);

        if (emailStatus === true) {

            let passwordStatus = passwordValidator(post.password);
            if (passwordStatus === true){
                if (passwordConfirm(post.password, post.passwordConfirmed)) {

                    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
                        if(err){
                            res.status(500).send({
                                error: err
                            });
                        }

                        let newUser = new UserModel({email: post.email, password: passwordHash(post.password)});

                        newUser.save((err) => {
                            if (err) {
                                res.status(500).send({
                                    error: err
                                });
                            }
                            console.log('User saved to database !');
                            res.status(200).send(newUser);
                        });
                    });

                }else {
                    console.log("Le mot de passe doit etre le meme");
                    res.status(400).send({
                        error: "Le mot de passe doit etre le meme"
                    });
                }
            } else {
                console.log(passwordStatus.error);
                res.status(400).send(passwordStatus);
            }

        } else {
            console.log('EmailStauts ' + emailStatus.error);
            res.status(400).send(emailStatus);
        }
    });

};

//on submit
const loginAction =  (req, res) => {
    let post = req.body;

    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
        if(err){
            res.status(500).send({
                error: err
            });
            return;
        }

        UserModel.find({
            email: post.email
        }, (err, user) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    error: err
                });
                return;
            }
            console.log(user);
            console.log(post.password);
            console.log(user[0].password);
            if ( user ) {
                if (hash.verify(post.password, user[0].password)) {
                    app.locals.user = user; //localStorage.setItem('user', user);
                    res.status(200).send(user);
                    return;
                } else {
                    console.log('Votre mot de passe est incorrect');
                    res.status(403).send({
                        error: 'Votre mot de passe est incorrect'
                    });
                    return;
                }
            } else {
                console.log('You have to register first');
                res.status(403).send({
                    error: "Ce compte n'été pas trouvé"
                });
                return;
            }
        });
    });

};

const logoutAction = (req, res) => {
    app.locals.user = null;
    res.status(200).send({
        success: 'Vous etes deconnecté'
    });
};

module.exports = {
    signUpAction: signUpAction,
    loginAction: loginAction,
    logoutAction: logoutAction
};