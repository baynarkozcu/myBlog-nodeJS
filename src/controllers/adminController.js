const homePage = (req, res, next)=>{
    res.render('index', {layout: './layouts/panel_layouts'});
}



module.exports ={
    homePage,
}