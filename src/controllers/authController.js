const {validationResult} = require('express-validator');

const loginView = (req, res, next) => {
    res.render('login', {layout: './layouts/auth_layouts'})
}

const loginUser = (req, res, next) => {
}

const registerView = (req, res, next) => {
    res.render('register', {layout: './layouts/auth_layouts'})
}

const registerUser = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty){
        res.render('register', {layout: './layouts/auth_layouts', errors: errors.array()});
    }
}

const forgetPasswordView = (req, res, next) => {
    res.render('forgetPassword', {layout: './layouts/auth_layouts'})
}

const forgetPasswordUser = (req, res, next) => {
    res.send("FOrget")
}


module.exports = {
    loginView,
    loginUser,
    registerView,
    registerUser,
    forgetPasswordView,
    forgetPasswordUser,
}