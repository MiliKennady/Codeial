const express = require('express');  //requiring the express library
const port = 8000;  //defining the port
const app = express(); //firing the express server

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