const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

//if erro in connecting to db

db.on('error', console.error.bind(console,"Error connecting to MongoDB"));

// once the connection to the db is open
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;