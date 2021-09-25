const {validationResult} = require('express-validator');
const User = require('../models/userModel');
const passport = require('passport');
require('../config/passportLocal')(passport);

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');



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
        req.flash('validationErrors', validationErrors.array());
        req.flash('username', req.body.username);
        req.flash('email', req.body.email);
        req.flash('password', req.body.password);
        res.redirect('/register');
    }else{
        const user = await User.findOne({email: req.body.email});
        if(user && user.emailConfirmation == true){
            req.flash('validationErrors', [{msg: "Böyle Bir Email Zaten Var.."}]);
            req.flash('username', req.body.username);
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            res.redirect('/register');
        }else if((user && user.emailConfirmation == false)  || user == null ){

            if(user){   
                await User.findByIdAndRemove({_id : user._id});
            }
            const  newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10)
            });
            await newUser.save();

            //JWT
            const token = jwt.sign({
                id: newUser.id,
                email: newUser.email,
            }, process.env.CONFIRM_SECRET, { expiresIn: '1d'});

            //NodeMailer
            const verifyURL = process.env.MAIL_VERIFY_URL+'verify?token='+token;

            let transporter = mailer.createTransport({
                service : 'gmail',
                auth : {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            await transporter.sendMail({
                from : '@baynarkozcu <baynarkozcuu@gmail.com',
                to: newUser.email,
                subject : "Emailinizi Onaylayınız.", 
                text : 'Emailinizi ONaylamak için Linke Tıklayın '+ verifyURL
            }, (error, info)=>{
                if(error){
                    console.log("Send Mail Error: " + error);
                }
                transporter.close();
            });

            req.flash('validationErrors', [{msg: "Lütfen Mail Kutunuzu Kontrol Edin.", result : 'success'}]);

            res.redirect('/login');
        }
    }
}

const forgetPasswordView = (req, res, next) => {
    res.render('forgetPassword', {layout: './layouts/auth_layouts'})
}

const forgetPasswordUser = async (req, res, next) => {
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        req.flash('validationErrors', validationErrors.array());
        req.flash('email', req.body.email);
        res.redirect('/forget-password');
    }else{
        

        try{

            const user = await User.findOne({email: req.body.email, emailConfirmation: true});

            if(user){

                const secretKey = process.env.MAIL_RESET_SECRET+'-'+user.password;

                const token = jwt.sign(
                    {id: user._id, email: user.email}, 
                    secretKey, 
                    {expiresIn: "1d"}             
                );

                const resetMailPasswordURL = process.env.MAIL_VERIFY_URL+'reset-password/'+ user._id+'/'+token;

                let transporter = mailer.createTransport({
                    service : 'gmail',
                    auth : {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASSWORD
                    }
                });


            await transporter.sendMail({
                from : '@baynarkozcu <baynarkozcuu@gmail.com',
                to: user.email,
                subject : "Şifre Sıfırlama Linki", 
                text : 'Şifrenizi Sıfırlamak için Linke Tıklayın '+ resetMailPasswordURL
            }, (error, info)=>{
                if(error){
                    console.log("Send Mail Error: " + error);
                }
                transporter.close();
            });

            req.flash('validationErrors', [{msg: "Şifre Sıfırlama Linki Mail Adresinize Yollanmıştır.", result : 'success'}]);
            res.redirect('/login');


            }else{
                req.flash('validationErrors', [{msg: "Bu mail Kayıtlı Değil veya Onaylanmamış."}]);
                req.flash('email', req.body.email);
                res.redirect('/forget-password');
            }

        }catch(error){
            console.log(`authController forgetPasswordUser Error : ${error}`);
        }

    }

}

const logout = (req, res, next) => {
    
    req.logout();
    req.session.destroy((error)=>{
        res.clearCookie('connect.sid');
        res.render('login', {layout: './layouts/auth_layouts'});
    });
}

const verify = (req, res) => {
    const token = req.query.token;
    if(token){

        try{
            jwt.verify(token, process.env.CONFIRM_SECRET, async (e, decoded)=>{
                if(e){
                    req.flash('validationErrors', [{msg: "Geçersiz Token. Lütfen Yeniden Kayıt Olun.."}]);
                    res.redirect('/login');
                }else{
                    const userID = decoded.id;
                    const result = await User.findByIdAndUpdate(userID, {emailConfirmation: true});
                
                    if(result){
                        req.flash('validationErrors', [{msg: "Emailiniz Onaylanmıştır.", result : 'success'}]);
                        res.redirect('/login');
                    }else{
                        req.flash('validationErrors', [{msg: "Bir Hata Çıktı Daha Sonra Tekrar Deneyin.."}]);
                        res.redirect('/login');
                    }
                }
            });
        }catch(error){
            console.log("authController verify Error"+ error);
        }

    }else{
        console.log("Token is NULL");
    }
}

const resetPasswordView = async (req, res) => {
    const userID = req.params.id;
    const token = req.params.token;

    if(userID && token){

        const user = await User.findOne({_id: userID});
        const secretKey = process.env.MAIL_RESET_SECRET+'-'+user.password;


        try{

            jwt.verify(token,secretKey, async(e, decoded)=>{
                if(e){
                    console.log("Error"+e);
                    req.flash('validationErrors', [{msg:"Geçersiz veya Süresi Geçmiş Token..."}]);
                    res.redirect('/forget-password');
                }else{
                    res.render('resetPassword', {userID, token, layout: './layouts/auth_layouts'})
                }
            });

        }catch(error){
            console.log(`authController resetPasswordView Error: ${error}`);
        }

    }else{
        console.log("Not 404 Found : userID & token");
        req.flash('validationErrors', [{msg: "Geçersiz Link. Şifrenizi Yeniden Sıfırlayın",}]);
        res.redirect('/forget-password');

    }
}

const resetPassword = async (req, res) => {
    const validationErrors = validationResult(req);


    if(!validationErrors.isEmpty()){
        req.flash('validationErrors', validationErrors.array());
        res.redirect('/reset-password/'+req.body.userID+'/'+req.body.token);
    }else{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await User.findByIdAndUpdate(req.body.userID, {password:hashedPassword});
        if(!result){
            req.flash('validationErrors', [{msg: "Şifre Sıfırlamada Bir Hata Meydana Geldi Lütfen Daha Sonra Tekrar Deneyin.."}]);
            res.redirect('/reset-password/'+req.body.userID+'/'+req.body.token);
        }else{
            req.flash('validationErrors', [{msg: "Şifreniz Başarıyla Sıfırlanmıştır..", result : 'success'}]);
            res.redirect('/login');
        }
    }
}


module.exports = {
    loginView,
    loginUser,
    registerView,
    registerUser,
    forgetPasswordView,
    forgetPasswordUser,
    logout,
    verify,
    resetPasswordView,
    resetPassword
}