const express = require('express');
const app = express();

app.get('/', function(req, res, next){
    try{
        res.send("Hello World!");
    }
    catch(err){
        next(err);
    }
    
});

//Error handler
app.use((err, req, res, next,)=>{
    res.status(500).send(err.message);
});

// Server checking
app.listen(3000, function(){
    console.log("Server is listening on port 3000");
})