const homePage = (req, res, next)=>{
    const languages = [
        {
            name: 'FLutter',
            value: 85,
            color: 'info',
            icon : "https://img.icons8.com/color/48/000000/flutter.png",
        },
        {
            name: 'NodeJS',
            value: 75,
            color: 'success',
            icon: "https://img.icons8.com/color/48/000000/nodejs.png"
        },
        {
            name: 'Laravel',
            value: 65,
            color: 'danger',
            icon: "https://img.icons8.com/fluency/48/000000/laravel.png"
        },
        {
            name: 'Javascript',
            value: 60,
            color: 'warning',
            icon: "https://img.icons8.com/color/48/000000/javascript--v1.png"
        },
        {
            name: 'C#',
            value: 45,
            color: 'secondary',
            icon: "https://img.icons8.com/color/48/000000/c-sharp-logo.png"
        },
        {
            name: 'PHP',
            value: 45,
            color: 'primary',
            icon: "https://img.icons8.com/dusk/48/000000/php-logo.png"
        },
        
    ];


    res.render('index', {layout: './layouts/panel_layouts', languages});
}



module.exports ={
    homePage,
}