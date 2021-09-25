const {validationResult} = require('express-validator');
const User = require('../models/userModel');

const passport = require('passport');
require('../config/passportLocal')(passport);



const loginView = (req, res, next) => {
    res.render('login', {layout: './layouts/auth_layouts'})
}

const loginUser = (req, res, next) => {

    const validationErrors = validationResult(req);
 

    if(!validationErrors.isEmpty()){
        //res.render('register', {layout: './layouts/auth_layouts', errors: errors.array()});
        req.flash('validationErrors', validationErrors.array());
        req.flash('email', req.body.email);
        req.flash('password', req.body.password);
        res.redirect('/login');
    }else{
        passport.authenticate('local', {
            successRedirect: '/panel',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }



}

const registerView = (req, res, next) => {
    res.render('register', {layout: './layouts/auth_layouts'})
}

const registerUser =  async (req, res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        //res.render('register', {layout: './layouts/auth_layouts', errors: errors.array()});
        req.flash('validationErrors', validationErrors.array());
        req.flash('username', req.body.username);
        req.flash('email', req.body.email);
        req.flash('password', req.body.password);
        res.redirect('/register');
    }else{
        const user = await User.findOne({email: req.body.email});
        if(user){
            req.flash('validationErrors', [{msg: "Böyle Bir Email Zaten Var.."}]);
            req.flash('username', req.body.username);
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            res.redirect('/register');
        }else{
            const  newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });
            await newUser.save();
            req.flash('validationErrors', [{msg: "Kayıt Başarılı..", result : 'success'}]);
            res.redirect('/register');
        }
    }
}

const forgetPasswordView = (req, res, next) => {
    res.render('forgetPassword', {layout: './layouts/auth_layouts'})
}

const forgetPasswordUser = (req, res, next) => {
    res.send("FOrget")
}

const logout = (req, res, next) => {
    
    req.logout();
    req.session.destroy((error)=>{
        res.clearCookie('connect.sid');
        res.render('login', {layout: './layouts/auth_layouts'});
    });
}


module.exports = {
    loginView,
    loginUser,
    registerView,
    registerUser,
    forgetPasswordView,
    forgetPasswordUser,
    logout
}