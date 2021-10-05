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

const emailValidation = ()=>{
    return [
        body('email').trim()
        .isEmail().withMessage("Geçerli Bir Email Giriniz.."),
    ];
}

const resetPassword = ()=>{
    return [
        body('password').trim()
            .isLength({min:8}).withMessage("Şifre Minimum 8 Karakter Olmalıdır.."),

        body('repassword').trim()
            .custom((value, {req})=>{
                if(value !== req.body.password){
                    throw new Error('Şifre ve Şifre Tekrar Aynı Olmalıdır..');
                }
                return true;
            })
    ];
}

// const addCV = ()=>{
//     return [
//         body('cv').trim()
//             .custom((value, {req})=>{
//                 console.log(value);
//                 if(!value.endsWith('.pdf')){
//                     throw new Error('Seçilen Dosya pdf Formatında Olmalıdır.');
//                 }
//                 return true; 
//             })
//     ];
// }


module.exports = {
    newUserValidation,
    userLogin,
    emailValidation,
    resetPassword,
}