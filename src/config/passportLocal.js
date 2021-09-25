const localStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');


module.exports = function(passport) {
    const options = {
        usernameField : 'email',
        passwordField : 'password'
    };

    passport.use(new localStrategy(options, async (email, password, done)=>{

        try{

            const user = await User.findOne({ email: email});
            if(!user){
                return done(null, false, { message: "Böyle bir Email Adresi Bulunamadı.."});
            }

            if(user.password != password){
                return done(null, false, { message: "Şifre Yanlış"});
            }else{
                return done(null, user);
            }

        }catch(error){
            console.log(`passportLocal Error :  ${error}`);
        }
    }));



    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

}