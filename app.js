require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
require('./src/config/mongoDB');
const path = require('path');
const authRouter = require('./src/routers/authRouter');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));


app.use('/', authRouter);






app.listen(process.env.PORT || 3000, ()=>{
    console.log(`${process.env.PORT} Listening`);
})