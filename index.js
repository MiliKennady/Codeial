const express = require('express');  //requiring the express library

const cookieParser = require('cookie-parser');

const app = express(); //firing the express server

const port = 8000;  //defining the port

//importing db
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');  //for mongo store to have a persistent storage for our session cookie

//sass middleware
const sassMiddleware = require('node-sass-middleware');

//this code needs to be put just before the server starts
app.use(sassMiddleware({
    src: './assets/sass',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

//setting up middlewear   also cookie parser requires middle wear since they are sent through request and response variables of the function
app.use(express.urlencoded({extended:true}));

//setting up cookie parser
app.use(cookieParser());

//which folder is the static files present in
app.use(express.static('./assets'));

//setting up layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);




//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScript', true)

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//middlewear for updating session cookie

app.use(session({
    name:'codeial', //name of the cookie
    //TODO change the secret before deployment in production mode
    secret:'blah',
    saveUninitialized:false,
    resave:false,
    cookie:{    //giving an age to the cookie, after which the cookie expires
        maxAge:(1000*60*100)    //in milliseconds
    },
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost/codeial_development',  //db the database connection
        autoRemove:'disabled'
    },
    function(err){ //callback function in case of error or succesful connection
        console.log( err || 'Connection to mongo store successfull');
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes/index'));

//listening to the server via our port
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server ${err}`);
        return;
    }

    console.log(`Server running Successfully on port ${port}`)
})