require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
require('./src/config/mongoDB');
const path = require('path');
const authRouter = require('./src/routers/authRouter');

const MongoDBStore = require('connect-mongodb-session')(session);
const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_CONNECTION_STRING,
    collection: 'sessions'
})


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: sessionStore
}));

app.use(flash());
app.use((req,res, next)=>{
    res.locals.validationErrors = req.flash('validationErrors');
    res.locals.username = req.flash('username');
    res.locals.email = req.flash('email');
    res.locals.password = req.flash('password');
    next();
});




app.use('/', authRouter);

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`${process.env.PORT} Listening`);
})