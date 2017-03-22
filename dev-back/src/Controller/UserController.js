const express = require('express');
const app = express();

app.locals.users = [];

const validator = require('email-validator');
const hash = require('password-hash');
const mongoose = require('mongoose');

const UserModel = require('../Model/Entity/User.js');

/**
 * Validates that email is valid and verifies that email doesn't already exist in database
 * Returns true if email is valid and unique (doesn't exist in database)
 * Returns object with key 'error' that contains error message, example: {error: "Email already exists"}
 * @param email
 * @param callback - takes as a parameter value to return
 */
const emailValidator = (email, callback) => {
    console.log('Email Validator enter in function');
    if (validator.validate(email)) {
        // check that email is unique
        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
            console.log('connected');
            // one needs to close the connection
            /*if(err){
                callback({error: err, statusCode: 500});
            }*/

            UserModel.find({ email: email }, (err, result) => {
                console.log('Error' + err);
                console.log('Result' + result);
                if (err) {
                    callback({ error: err, statusCode: 500 });
                }

                //if result is not empty list  !=[]
                callback(!result.length ? true : { error: "Votre email existe déjà" });
            });
        });

    } else {
        callback({
            error: "Votre email n'est pas valide"
        });
    }
};

/**
 * Validates that password contains at least one digit, at least one lowercase and uppercase letter, one special character !$#?, > 5 characters
 * @param {string} password
 * @returns {boolean|Object} true or {error: 'Error message'}
 */
const passwordValidator = (password) => {
    let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$#?]).{5,}/;
    if (regex.test(password)) {
        return true;
    } else {
        return {
            error: "Le password doit contenir 5 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial(!, $, #,?)"
        };
    }
};

/**
 * Verifies that passwords are identical
 * @param password
 * @param confirmedPassword
 * @returns {boolean}
 */
const passwordConfirm = (password, confirmedPassword) => {
    return (password === confirmedPassword);
};

/**
 * Returns the hashed value of the password
 * @param password
 */
const passwordHash = (password) => {
    return hash.generate(password);
};

/**
 * Sends the response which contains an object User and status 200
 * or object with key 'error' that contains an error message and gives the error status code: 500, 400
 * @param req
 * @param res
 */
const signUpAction = (req, res) => {
    let post = req.body;
    emailValidator(post.email, (emailStatus) => {
        console.log(emailStatus);

        if (emailStatus === true) {

            let passwordStatus = passwordValidator(post.password);
            if (passwordStatus === true) {

                if (passwordConfirm(post.password, post.passwordConfirmed)) {

                    mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
                        //gives error, connection has to be closed
                        /*if(err){
                            res.status(500).send({
                                error: err
                            });
                            return;
                        }*/

                        let newUser = new UserModel({
                            email: post.email,
                            password: passwordHash(post.password)
                        });

                        //insertUser(...)
                        newUser.save((err) => {
                            if (err) {
                                res.status(500).send({
                                    error: err
                                });
                                return;
                            }
                            console.log('User saved to database !');
                            res.status(200).send(newUser);
                            //return;
                        });

                    });

                } else {
                    console.log("Le mot de passe doit etre le meme");
                    res.status(400).send({
                        error: "Le mot de passe doit etre le meme"
                    });
                    //return;
                }
            } else {
                console.log(passwordStatus.error);
                res.status(400).send(passwordStatus);
                //return;
            }

        } else {
            console.log('EmailStauts ' + emailStatus.error);
            res.status(400).send(emailStatus);
            //return;
        }
    });

};

/**
 * Sends the object User and status 200
 * or object of type {error: 'Error message'} and error status code: 500, 403
 * @param req
 * @param res
 */
const loginAction = (req, res) => {
    let post = req.body;

    if (post.email && post.password) {

        mongoose.connect('mongodb://momo-bibi:imieimie@ds135820.mlab.com:35820/momo-bibi', (err) => {
            console.log('connected');
            //one needs to close the connection
            if (err) {
                res.status(500).send({
                    error: err
                });
                return;
            }

            //findUserByEmail
            UserModel.find({
                email: post.email
            }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        error: err
                    });
                    //return;
                }
                console.log(user);

                if (user.length) {
                    if (hash.verify(post.password, user[0].password)) {
                        app.locals.users.push(user[0]); //localStorage.setItem('user', user);
                        res.status(200).send(user[0]);
                        //return;
                    } else {
                        console.log('Votre mot de passe est incorrect');
                        res.status(403).send({
                            error: 'Votre mot de passe est incorrect'
                        });
                        //return;
                    }
                } else {
                    console.log('You have to register first');
                    res.status(403).send({
                        error: "Ce compte n'été pas trouvé"
                    });
                    //return;
                }
            });
        });
    } else {
        console.log('Veuillez saisir tous les champs');
        res.status(403).send({
            error: "Veuillez saisir tous les champs"
        });
        //return;
    }

};

/**
 * Sets user from app.locals to null and sends the response of type {success: 'Success message'} and status code 200
 * @param req
 * @param res
 */
const logoutAction = (req, res) => {
    const userId = req.params.userId;
    for (let i = 0; i < app.locals.users.length; i++) {
        if (app.locals.users[i]._id == userId) {
            app.locals.users.splice(i, 1);
            res.status(200).send({
                success: 'Vous êtes deconnecté'
            });
            return;
        }
    }
    res.status(500).send({ error: "Impossible de deconnecter user" });
};

module.exports = {
    signUpAction: signUpAction,
    loginAction: loginAction,
    logoutAction: logoutAction,

    emailValidator: emailValidator,
    passwordValidator: passwordValidator,
    passwordConfirm: passwordConfirm,
    passwordHash: passwordHash
};