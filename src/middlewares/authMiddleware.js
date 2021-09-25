const authMiddleware = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
         res.redirect('/login');
    }
}

const currentUser = (req, res, next)=>{
    if(!req.isAuthenticated()){
        return next();
    }else{
         res.redirect('/panel');
    }
}


module.exports ={
    authMiddleware,
    currentUser,
}