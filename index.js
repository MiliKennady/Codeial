const express = require('express');  //requiring the express library

const port = 8000;  //defining the port
const app = express(); //firing the express server

const cookieParser = require('cookie-parser');

//which folder is the static files present in
app.use(express.static('./assets'));

//setting up layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//importing db
const db = require('./config/mongoose');


//setting up middlewear   also cookie parser requires middle wear since they are sent through request and response variables of the function
app.use(express.urlencoded({extended:true}));

//setting up cookie parser
app.use(cookieParser());


//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScript', true)

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//use express router
app.use('/', require('./routes/index'))


//listening to the server via our port
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server ${err}`);
        return;
    }

    console.log(`Server running Successfully on port ${port}`)
})