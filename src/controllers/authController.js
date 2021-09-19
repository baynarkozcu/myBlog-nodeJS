const loginView = (req, res, next) => {
    res.render('login', {layout: './layouts/auth_layouts'})
}

const loginUser = (req, res, next) => {
    res.send("LOgin");
}

const registerView = (req, res, next) => {
    res.render('register', {layout: './layouts/auth_layouts'})
}

const registerUser = (req, res, next) => {
    res.send("Rewgister");
}

const forgetPasswordView = (req, res, next) => {
    res.render('forget_password', {layout: './layouts/auth_layouts'})
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