const {body} = require('express-validator');

const newUserValidation = ()=>{
    return [
        body('email').trim()
            .isEmail().withMessage("Geçerli Bir Email Giriniz.."),
        
        body('username').trim()
            .isLength({min:6, max:32}).withMessage("username 6 - 32 Karakter Aralığında Olabilir.."),

        body('password').trim()
            .isLength({min:8}).withMessage("Şifre Minimum 8 Karakter Olmalıdır.."),
    ];
}

const userLogin = ()=>{
    return [
        body('email').trim()
            .isEmail().withMessage("Geçerli Bir Email Giriniz.."),
        

        body('password').trim()
            .isLength({min:8}).withMessage("Şifre Minimum 8 Karakter Olmalıdır.."),
    ];
}


module.exports = {
    newUserValidation,
    userLogin
}